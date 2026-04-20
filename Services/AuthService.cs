using WebApplication1.DTOs.User;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{

    public class AuthService
    {
        private readonly UserRepository _userRepository;

        public AuthService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        /// <summary>
        /// Bejelentkezési logika
        /// </summary>
        /// <param name="dto">Login adatok</param>
        /// <returns>Ha sikeres -> User, különben null</returns>
        public async Task<User?> LoginAsync(LoginDto dto)
        {
            var user = await _userRepository.GetByEmailAsync(dto.Email);

            if (user == null)
                return null;


            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return null;

            return user;
        }

        /// <summary>
        /// Regisztrációs logika
        /// </summary>
        /// <param name="dto">Regisztrációs adatok</param>
        public async Task<bool> RegisterAsync(RegisterDto dto)
        {
            var existingUser = await _userRepository.GetByEmailAsync(dto.Email);

            if (existingUser != null)
                return false;

            var user = new User
            {
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Username = dto.Username,
            };

            await _userRepository.AddAsync(user);

            return true;
        }
    }
}
