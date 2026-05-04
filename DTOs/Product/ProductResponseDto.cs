namespace WebApplication1.DTOs.Product
{
    public class ProductResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool IsUsed { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public string SellerName { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
    }
}
