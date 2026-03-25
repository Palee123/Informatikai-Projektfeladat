using System.Xml.Linq;

namespace WebApplication1.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        public string Role { get; set; } // Admin vagy sima User


        // Felhasználóhoz tartozó termékek és commentek gyüjteménye
        public ICollection<Product> Products { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
