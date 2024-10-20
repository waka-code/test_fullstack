using Microsoft.EntityFrameworkCore;

namespace Productos.Api.Models
{
    public class ProductContext: DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options): base(options) 
        {
        }

        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>().HasIndex(p => p.Name).IsUnique();
        }
    }
}
