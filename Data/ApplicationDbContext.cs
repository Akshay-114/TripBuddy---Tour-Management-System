using Microsoft.EntityFrameworkCore;
using TripBuddy.Models;

namespace TripBuddy.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }


        public DbSet<AddPackages> AddPackages { get; set; }
        public DbSet<UserForm> UserForm { get; set; }
        public DbSet<Login> Login { get; set; }
    }
}

