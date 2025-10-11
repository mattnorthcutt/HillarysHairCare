using Microsoft.EntityFrameworkCore;
using HillarysHairCare.Models; 

public class HillaryDbContext : DbContext
{
    public HillaryDbContext(DbContextOptions<HillaryDbContext> options) : base(options) { }

    public DbSet<Stylist> Stylists { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<AppointmentService> AppointmentServices { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Stylist>().HasData(
            new Stylist { Id = 1, FirstName = "Alex", LastName = "Fade",  IsActive = true },
            new Stylist { Id = 2, FirstName = "Sam",  LastName = "Color", IsActive = true }
        );

        modelBuilder.Entity<Customer>().HasData(
            new Customer { Id = 1, FirstName = "Jamie", LastName = "Lane", Email = "jamie@example.com", Phone = "555-0001" },
            new Customer { Id = 2, FirstName = "Riley", LastName = "Park", Email = "riley@example.com", Phone = "555-0002" }
        );

        modelBuilder.Entity<Service>().HasData(
            new Service { Id = 1, Name = "Haircut",    Price = 35.00m, IsActive = true },
            new Service { Id = 2, Name = "Color",      Price = 65.00m, IsActive = true },
            new Service { Id = 3, Name = "Beard Trim", Price = 15.00m, IsActive = true }
        );

        modelBuilder.Entity<Appointment>().HasData(
            new Appointment { Id = 1, CustomerId = 1, StylistId = 1, StartTime = new DateTime(2025, 10, 20, 10, 0, 0), IsCanceled = false }
        );

        modelBuilder.Entity<AppointmentService>().HasData(
            new AppointmentService { Id = 1, AppointmentId = 1, ServiceId = 1 },
            new AppointmentService { Id = 2, AppointmentId = 1, ServiceId = 3 }
        );
    }
}
