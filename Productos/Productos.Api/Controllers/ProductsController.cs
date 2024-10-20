using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Productos.Api.Models;

namespace Productos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductContext _context;

        public ProductsController(ProductContext context)
        {
            _context = context;
        }
       
        // ADD
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("list")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(int pageNumber = 1, int pageSize = 10)
        {
            var totalRecords = await _context.Products.CountAsync();
            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var products = await _context.Products
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var response = new
            {
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                PageNumber = pageNumber,
                PageSize = pageSize,
                Products = products
            };

            return Ok(response);
        }

        // VER PRODUCTO
        [HttpGet]
        [Route("product")]
        public async Task<IActionResult> GetProduct(string name)
        {
            var products = await _context.Products
                                  .Where(p => p.Name.ToLower().Contains(name.ToLower()))
                                  .ToListAsync();

            if (products == null || products.Count == 0)
            {
                return NotFound();
            }

            return Ok(products);
        }

        // UPDATE
        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
           var exist = await _context.Products.FindAsync(id);

            exist.Description = product.Description;
            exist.Name = product.Name;
            exist.Price = product.Price;
            exist.stock = product.stock;
            exist.LastUpdate = product.LastUpdate;
            exist.CreationDate = product.CreationDate;
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE
        [HttpDelete]
        [Route("delete")]
        public async Task<IActionResult>DeleteProduct(int id)
        {
            var deleteProduct = await _context.Products.FindAsync(id);
            _context.Products.Remove(deleteProduct);
            await _context.SaveChangesAsync();
            return Ok();


        }

    }

}
