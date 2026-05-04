using System.ComponentModel.DataAnnotations;

namespace WebApplication1.DTOs.Product
{
    public class UpdateProductDto
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(2000, MinimumLength = 10)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Range(0.01, 1000000)]
        public decimal Price { get; set; }

        [Required]
        public bool IsUsed { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int CategoryId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int RequestUserId { get; set; }
    }
}
