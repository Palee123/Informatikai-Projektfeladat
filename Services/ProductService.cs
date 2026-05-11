using WebApplication1.DTOs.Product;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class ProductService
    {
        private readonly ProductRepository _productRepository;

        public ProductService(ProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<List<ProductResponseDto>> GetAllAsync()
        {
            var products = await _productRepository.GetAllAsync();
            return products.Select(MapToResponse).ToList();
        }

        public async Task<List<ProductResponseDto>> GetByUserIdAsync(int userId)
        {
            var products = await _productRepository.GetByUserIdAsync(userId);
            return products.Select(MapToResponse).ToList();
        }

        public async Task<ProductResponseDto?> GetByIdAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            return product == null ? null : MapToResponse(product);
        }

        public async Task<ProductActionResult> CreateAsync(CreateProductDto dto)
        {
            var user = await _productRepository.GetUserByIdAsync(dto.UserId);
            if (user == null)
            {
                return ProductActionResult.Fail("A megadott felhasznalo nem letezik.");
            }

            var category = await _productRepository.GetCategoryByIdAsync(dto.CategoryId);
            if (category == null)
            {
                return ProductActionResult.Fail("A megadott kategoria nem letezik.");
            }

            var product = new Product
            {
                Title = dto.Title.Trim(),
                Description = dto.Description.Trim(),
                Price = dto.Price,
                IsUsed = dto.IsUsed,
                CreatedAt = DateTime.UtcNow,
                UserId = dto.UserId,
                CategoryId = dto.CategoryId,
                Meret = dto.Meret,
                Type = dto.Type,
                ImageUrl = dto.ImageUrl
            };

            await _productRepository.AddAsync(product);

            var createdProduct = await _productRepository.GetByIdAsync(product.Id);
            return ProductActionResult.Success(MapToResponse(createdProduct!));
        }

        public async Task<ProductActionResult> UpdateAsync(int productId, UpdateProductDto dto)
        {
            var product = await _productRepository.GetByIdAsync(productId);
            if (product == null)
            {
                return ProductActionResult.Fail("A termek nem talalhato.", true);
            }

            var requestingUser = await _productRepository.GetUserByIdAsync(dto.RequestUserId);
            if (requestingUser == null)
            {
                return ProductActionResult.Fail("A modositast kero felhasznalo nem letezik.");
            }

            var isAdmin = string.Equals(requestingUser.Role, "Admin", StringComparison.OrdinalIgnoreCase);
            if (!isAdmin && product.UserId != dto.RequestUserId)
            {
                return ProductActionResult.Fail("Csak a sajat termekedet szerkesztheted.");
            }

            var category = await _productRepository.GetCategoryByIdAsync(dto.CategoryId);
            if (category == null)
            {
                return ProductActionResult.Fail("A megadott kategoria nem letezik.");
            }

            product.Title = dto.Title.Trim();
            product.Description = dto.Description.Trim();
            product.Price = dto.Price;
            product.IsUsed = dto.IsUsed;
            product.CategoryId = dto.CategoryId;

            await _productRepository.UpdateAsync(product);

            var updatedProduct = await _productRepository.GetByIdAsync(product.Id);
            return ProductActionResult.Success(MapToResponse(updatedProduct!));
        }

        private static ProductResponseDto MapToResponse(Product product)
        {
            return new ProductResponseDto
            {
                Id = product.Id,
                Title = product.Title,
                Description = product.Description,
                Price = product.Price,
                IsUsed = product.IsUsed,
                CreatedAt = product.CreatedAt,
                UserId = product.UserId,
                SellerName = product.User?.Username ?? string.Empty,
                CategoryId = product.CategoryId,
                CategoryName = product.Category?.Name ?? string.Empty,
                ImageUrl = product.ImageUrl
            };
        }
    }

    public class ProductActionResult
    {
        public bool IsSuccess { get; private set; }
        public bool IsNotFound { get; private set; }
        public string ErrorMessage { get; private set; } = string.Empty;
        public ProductResponseDto? Product { get; private set; }

        public static ProductActionResult Success(ProductResponseDto product)
        {
            return new ProductActionResult
            {
                IsSuccess = true,
                Product = product
            };
        }

        public static ProductActionResult Fail(string errorMessage, bool isNotFound = false)
        {
            return new ProductActionResult
            {
                IsSuccess = false,
                IsNotFound = isNotFound,
                ErrorMessage = errorMessage
            };
        }
    }
}
