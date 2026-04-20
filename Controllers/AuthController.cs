using Microsoft.AspNetCore.Mvc;
using WebApplication1.DTOs.User;
using WebApplication1.Services;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
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

        return Ok(new
        {
            message = "Sikeres bejelentkezés",
            userId = user.Id,
            email = user.Email
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
}