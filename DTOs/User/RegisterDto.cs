using System.ComponentModel.DataAnnotations;

namespace WebApplication1.DTOs.User
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(1)]
        public string Password { get; set; }
        [Required]
        public string Username { get; set; }
    }
}
