using HillarysHairCare.Models;
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

app.Run();
