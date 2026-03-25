using System.Text.Json.Serialization;
using System.Xml.Linq;

namespace WebApplication1.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }

        public string Role { get; set; } // Admin vagy sima User


        // Felhasználóhoz tartozó termékek és commentek gyüjteménye
        [JsonIgnore]
        public ICollection<Product>? Products { get; set; }
        [JsonIgnore]
        public ICollection<Comment>? Comments { get; set; }
    }
}
