using AppDbContextNamespace.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebApplication1.DTOs.User;

namespace WebApplication1.Controllers
{
    [Route("api/profile")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProfileController(AppDbContext context)
        {
            _context = context;
        }

        private int GetUserId()
        {
            return int.Parse(
                User.FindFirst(
                    ClaimTypes.NameIdentifier
                )!.Value
            );
        }

        [HttpGet]
        public async Task<ActionResult<UserProfileDto>> GetProfile()
        {
            var userId = GetUserId();

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return NotFound();

            return new UserProfileDto
            {
                Email = user.Email,
                FullName = user.FullName,
                Phone = user.Phone,
                Address = user.Address,
                City = user.City
            };
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile(UserProfileDto dto)
        {
            var userId = GetUserId();

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return NotFound();

            user.FullName = dto.FullName;
            user.Phone = dto.Phone;
            user.Address = dto.Address;
            user.City = dto.City;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Profil frissítve" });
        }


        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return NotFound();

            //Jelenlegi jelszó ellenőrzés
            if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
                return BadRequest(new { message = "Hibás jelenlegi jelszó." });

            //Új jelszó mentése
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Jelszó sikeresen módosítva." });
        }


    }
}
