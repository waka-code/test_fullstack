using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Productos.Api.Models;
using System.Text;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Productos.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserContext _context_user;
        private readonly IConfiguration _configuration;

        public UserController(UserContext context, IConfiguration configuration)
        {
            _context_user = context;
            _configuration = configuration;
        }

        // ADD User
        [HttpPost]
        [Route("create-new-user")]
        public async Task<IActionResult> CreateNewUser(User user)
        {
            var hashedBytes = SHA256.HashData(Encoding.UTF8.GetBytes(user.Password));
            user.Password = Convert.ToBase64String(hashedBytes);

            await _context_user.Users.AddAsync(user);
            await _context_user.SaveChangesAsync();

            return Ok();
        }

        // USER LIST
        [HttpGet]
        [Route("list-user")]
        public async Task<ActionResult<IEnumerable<User>>> GetListUsers()
        {
            var list = await _context_user.Users.ToListAsync();
            return Ok(list);
        }


        // LOGIN
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin loginDetails)
        {
            var user = await _context_user.Users.FirstOrDefaultAsync(u => u.Email == loginDetails.Email);
            if (user == null || !VerifyPassword(loginDetails.Password, user.Password))
            {
                return Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["environmentVariables:JWT_SECRET_KEY"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Role, user.Role)
        }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { Token = tokenString });
        }

        private static bool VerifyPassword(string plainTextPassword, string hashedPassword)
        {
            var hashedBytes = SHA256.HashData(Encoding.UTF8.GetBytes(plainTextPassword));
            var enteredPasswordHash = Convert.ToBase64String(hashedBytes);
            return enteredPasswordHash == hashedPassword;
        }

    }
}
