using HillarysHairCare.Models;
using HillarysHairCare.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

builder.Services.AddNpgsql<HillaryDbContext>(builder.Configuration["HillarysHairCareDbConnectiongString"]);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/api/services", (HillaryDbContext db) =>
{
    return db.Services.Where(s => s.IsActive).Select(s => new 
    {
        s.Id,
        s.Name,
        s.Price,
        s.IsActive
    }).ToList();
});

app.MapGet("/api/customers", (HillaryDbContext db) =>
{
    return db.Customers.Select(c => new
    {
        c.Id,
        c.FirstName,
        c.LastName,
        c.Email,
        c.Phone,
    }).ToList();
});

app.MapGet("/api/stylists", (HillaryDbContext db) =>
{
    return db.Stylists
        .Select(s => new
        {
            s.Id,
            s.FirstName,
            s.LastName,
            s.IsActive
        })
        .ToList();
});

app.MapGet("/api/appointments/upcoming", (HillaryDbContext db) =>
{
    return db.Appointments.Where(a => !a.IsCanceled && a.StartTime >= DateTime.Now).Include(a => a.Customer).Include(a => a.Stylist).Select(a => new
    {
        a.Id,
        a.StartTime,
        Customer = new { a.Customer.Id, a.Customer.FirstName, a.Customer.LastName },
        Stylist = new { a.Stylist.Id, a.Stylist.FirstName, a.Stylist.LastName }
    }).ToList();
});

app.MapGet("/api/appointments/{id}", (HillaryDbContext db, int id) =>
{
    var appt = db.Appointments
        .Include(a => a.Customer)
        .Include(a => a.Stylist)
        .Include(a => a.AppointmentServices)
        .ThenInclude(asg => asg.Service)
        .SingleOrDefault(a => a.Id == id);

    if (appt is null) return Results.NotFound();

    var dto = new
    {
        id = appt.Id,
        startTime = appt.StartTime,
        isCanceled = appt.IsCanceled,

        customer = appt.Customer == null ? null : new
        {
            appt.Customer.Id,
            appt.Customer.FirstName,
            appt.Customer.LastName,
            appt.Customer.Email,
            appt.Customer.Phone
        },

        stylist = appt.Stylist == null ? null : new
        {
            appt.Stylist.Id,
            appt.Stylist.FirstName,
            appt.Stylist.LastName,
            appt.Stylist.IsActive
        },

        services = appt.AppointmentServices
            .Select(s => new
            {
                s.Service.Id,
                s.Service.Name,
                s.Service.Price
            })
            .ToList(),

        total = appt.AppointmentServices.Sum(s => s.Service.Price)
    };

    return Results.Ok(dto);
});


app.MapPost("/api/customers", (HillaryDbContext db, Customer c) =>
{
    db.Customers.Add(c);
    db.SaveChanges();
    return Results.Created($"/api/customers/{c.Id}", c);
});

app.MapPut("/api/stylists/{id}/deactivate", (HillaryDbContext db, int id) =>
{
    var s = db.Stylists.Find(id);
    if (s is null) return Results.NotFound();
    s.IsActive = false;
    db.SaveChanges();
    return Results.NoContent();
});

app.MapPut("/api/stylists/{id}/reactivate", (HillaryDbContext db, int id) =>
{
    var s = db.Stylists.Find(id);
    if (s is null) return Results.NotFound();
    s.IsActive = true;
    db.SaveChanges();
    return Results.NoContent();
});

app.MapPut("/api/appointments/{id}/cancel", (HillaryDbContext db, int id) =>
{
    var appt = db.Appointments.Find(id);
    if (appt is null) return Results.NotFound();

    if (!appt.IsCanceled)
    {
        appt.IsCanceled = true;
        db.SaveChanges();
    }

    return Results.NoContent();
});

app.MapPost("/api/appointments", (HillaryDbContext db, CreateAppointmentDTO dto) =>
{
    var stylist = db.Stylists.Find(dto.StylistId);
    if (!stylist.IsActive) return Results.BadRequest("Inactive Stylist");

    var appt = new Appointment
    {
        CustomerId = dto.CustomerId,
        StylistId  = dto.StylistId,
        StartTime  = dto.StartTime, 
        IsCanceled = false
    };

    db.Appointments.Add(appt);
    db.SaveChanges();

    if (dto.ServiceIds != null)
    {
        foreach (var sid in dto.ServiceIds)
        {
            db.AppointmentServices.Add(new AppointmentService
            {
                AppointmentId = appt.Id,
                ServiceId     = sid
            });
        }
        db.SaveChanges();
    }

    return Results.Created($"/api/appointments/{appt.Id}", new
    {
        appt.Id,
        appt.CustomerId,
        appt.StylistId,
        appt.StartTime,
        ServiceIds = dto.ServiceIds
    });
});


app.Run();
