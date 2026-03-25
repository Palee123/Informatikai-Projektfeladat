using System.Xml.Linq;

namespace WebApplication1.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

        public bool IsUsed { get; set; } // új vagy használt
        public DateTime CreatedAt { get; set; }

        // kapcsolatok
        public int UserId { get; set; }
        public User User { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}
