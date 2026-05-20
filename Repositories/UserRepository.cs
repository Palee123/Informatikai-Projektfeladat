using AppDbContextNamespace.Data;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class UserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        // Email alapján user keresés
        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User?> GetFirstUserAsync()
        {
            return await _context.Users
                .OrderBy(u => u.Id)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> HasAdminAsync()
        {
            return await _context.Users
                .AnyAsync(u => u.Role != null && u.Role.ToLower() == "admin");
        }

        // Új user hozzáadása
        
        public async Task AddAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}
