using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApplication1.DTOs.User;
using WebApplication1.Models;
using WebApplication1.Services;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly IConfiguration _configuration;

    public AuthController(AuthService authService, IConfiguration configuration)
    {
        _authService = authService;
        _configuration = configuration;
    }

    /// <summary>
    /// Bejelentkezés
    /// </summary>
    /// <param name="dto">Email és jelszó</param>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _authService.LoginAsync(dto);

        if (user == null)
            return Unauthorized("Hibás email vagy jelszó");

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var token = CreateToken(user);

        return Ok(new
        {

            message = "Sikeres bejelentkezés",
            usertoken = token , 
            userId = user.Id,
            email = user.Email,
            role = user.Role ?? "User"
        });

    }

    /// <summary>
    /// Regisztráció
    /// </summary>
    /// <param name="dto">Regisztrációs adatok</param>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var success = await _authService.RegisterAsync(dto);

        if (!success)
            return BadRequest("Ez az email már létezik");

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        return Ok(new
        {
            message = "Sikeres regisztráció"
        });
    }
    private string CreateToken(User user)
    {
        var claims = new[]
        {
        new Claim(
            ClaimTypes.NameIdentifier,
            user.Id.ToString()
        ),

        new Claim(
            ClaimTypes.Email,
            user.Email
        ),

        new Claim(
            ClaimTypes.Role,
            user.Role ?? "User"
        )
    };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(
                _configuration["Jwt:Key"]
            )
        );

        var creds = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256
        );

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],

            audience: _configuration["Jwt:Audience"],

            claims: claims,

            expires: DateTime.Now.AddDays(7),

            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}
