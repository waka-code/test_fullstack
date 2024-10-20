using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text;

namespace Productos.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        [MaxLength(20)]
        public required string Name { get; set; }
        [MaxLength(100)]
        public string Password { get; set; } = null!;
        [MaxLength(100)]
        public string Email { get; set; } = null!;
        [MaxLength(20)]
        public required string Role { get; set; }
    }

    public class UserLogin
    {
        [MaxLength(100)]
        public string Email { get; set; } = null!;

        [MaxLength(100)]
        public string Password { get; set; } = null!;
    }
}


