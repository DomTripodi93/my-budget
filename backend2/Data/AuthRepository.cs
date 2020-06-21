using System;
using System.Threading.Tasks;
using AutoMapper;
using backend.Dtos;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AuthRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<User> Login(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
            
            if (user == null)
                return null;

            if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i=0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            user = AddSettings(user);
            user = AddBankAccount(user);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private User AddSettings(User user)
        {
            SettingsForCreationDto settingsForCreation = new SettingsForCreationDto{
                IsNew = true,
                TransactionPageSize = 20,
                AccountPageSize = 20
            };

            Settings settings = _mapper.Map<Settings>(settingsForCreation);

            user.Settings = settings;

            return user;
        }

        private User AddBankAccount(User user)
        {
            AccountForCreationDto accountForCreation = new AccountForCreationDto{
                Name = "Bank",
                AccountType = "Income"
            };

            Account Bank = _mapper.Map<Account>(accountForCreation);

            Bank.IsBank = true;

            user.Bank = Bank;

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string email)
        {
            if (await _context.Users.AnyAsync(x => x.Email == email))
                return true;
            return false;
        }
    }
}