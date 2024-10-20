using Microsoft.EntityFrameworkCore;

namespace Productos.Api.Models
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>()
              .HasIndex(p => new { p.Name, p.Email })
              .IsUnique();

        }

    }
}


