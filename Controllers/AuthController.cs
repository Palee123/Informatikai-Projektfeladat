using AppDbContextNamespace.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    // REGISZTRÁCIÓ
    [HttpPost("register")]
    public async Task<IActionResult> Register(User user)
    {
        var newUser = new User
        {
            Username = user.Username,
            Email = user.Email,
            PasswordHash = user.PasswordHash,
            Role = "User"
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            newUser.Id,
            newUser.Username,
            newUser.Email
        });
    }

    // LOGIN
    [HttpPost("login")]
    public async Task<IActionResult> Login(User loginUser)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == loginUser.Email
                                  && u.PasswordHash == loginUser.PasswordHash);

        if (user == null)
            return Unauthorized("Hibás email vagy jelszó");

        return Ok(new
        {
            message = "Sikeres bejelentkezés",
            user = new
            {
                user.Id,
                user.Username,
                user.Email,
                user.Role
            }
        });
    }
}