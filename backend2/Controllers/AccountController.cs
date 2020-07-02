using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/{userId}/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ITransactionRepository _repo;
        private readonly IUserRepository _userRepo;

        public AccountController(IMapper mapper, ITransactionRepository repo, IUserRepository userRepo)
        {
            _mapper = mapper;
            _repo = repo;
            _userRepo = userRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddAccount(int userId, AccountForCreationDto AccountForCreation)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var Account = _mapper.Map<Account>(AccountForCreation);

            Account.User = creator;
            Account.Balance = 0;
            Account.Active = true;
            Account.IsBank = false;

            _repo.Add(Account);

            if (await _repo.SaveAll())
            {
                var jobToReturn = _mapper.Map<AccountForReturnDto>(Account);
                return CreatedAtRoute("GetAccount", new { Name = Account.Name, userId = userId }, jobToReturn);
            }

            throw new Exception("Creation of Account failed on save");

        }

        [HttpPost("first")]
        public async Task<IActionResult> AddFirstAccount(int userId, AccountForCreationDto AccountForCreation)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var Account = _mapper.Map<Account>(AccountForCreation);

            Account.User = creator;
            Account.Balance = 0;
            Account.Active = true;
            Account.IsBank = true;

            _repo.Add(Account);

            if (await _repo.SaveAll())
            {
                var jobToReturn = _mapper.Map<AccountForReturnDto>(Account);
                return CreatedAtRoute("GetAccount", new { Name = Account.Name, userId = userId }, jobToReturn);
            }

            throw new Exception("Creation of Account failed on save");

        }

        [HttpGet("byName/{Name}", Name = "GetAccount")]
        public async Task<IActionResult> GetAccount(int userId, string Name)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var AccountFromRepo = await _repo.GetAccountByName(userId, Name);

            AccountForReturnDto AccountForReturn = _mapper.Map<AccountForReturnDto>(AccountFromRepo);

            return Ok(AccountForReturn);

        }

        [HttpGet("byUser")]
        public async Task<IActionResult> GetAccountsForUser(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<Account> AccountsFromRepo = await _repo.GetAccountsByUser(userId);

            IEnumerable<AccountForReturnDto> AccountsForReturn = _mapper.Map<IEnumerable<AccountForReturnDto>>(AccountsFromRepo);

            return Ok(AccountsForReturn);

        }

        [HttpGet("byType/{Type}")]
        public async Task<IActionResult> GetAccountsForType(int userId, string Type)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<Account> AccountsFromRepo = await _repo.GetAccountsByType(userId, Type);

            IEnumerable<AccountForReturnDto> AccountForReturn = _mapper.Map<IEnumerable<AccountForReturnDto>>(AccountsFromRepo);

            return Ok(AccountForReturn);

        }

        [HttpGet("bank")]
        public async Task<IActionResult> GetUserBankAccount(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            Account BankAccount = await _repo.GetBankAccount(userId);

            AccountForReturnDto AccountForReturn = _mapper.Map<AccountForReturnDto>(BankAccount);

            return Ok(AccountForReturn);

        }

        [HttpPut("byName/{Name}")]
        public async Task<IActionResult> UpdateAccount(int userId, string Name, AccountForCreationDto AccountForUpdateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var AccountFromRepo = await _repo.GetAccountByName(userId, Name);

            _mapper.Map(AccountForUpdateDto, AccountFromRepo);

            if (await _repo.SaveAll())
                return CreatedAtRoute("GetAccount", new { Name = AccountFromRepo.Name, userId = userId }, AccountFromRepo);

            throw new Exception($"Updating Account {Name} failed on save");
        }

        [HttpPut("balance/{Name}")]
        public async Task<IActionResult> UpdateAccountBalance(int userId, string Name, AccountForBalanceUpdateDto AccountForUpdateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var AccountFromRepo = await _repo.GetAccountByName(userId, Name);

            _mapper.Map(AccountForUpdateDto, AccountFromRepo);

            if (await _repo.SaveAll())
                return CreatedAtRoute("GetAccount", new { Name = AccountFromRepo.Name, userId = userId }, AccountFromRepo);

            throw new Exception($"Updating Account {Name} failed on save");
        }

        [HttpPut("isBank/{Name}")]
        public async Task<IActionResult> UpdateBankAccount(int userId, string Name)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var AccountFromRepo = await _repo.GetAccountByName(userId, Name);

            var BankAccount = await _repo.GetBankAccount(userId);

            BankAccount.IsBank = false;

            AccountFromRepo.IsBank = true;
            AccountFromRepo.Active = true;

            if (await _repo.SaveAll())
                return CreatedAtRoute("GetAccount", new { Name = AccountFromRepo.Name, userId = userId }, AccountFromRepo);

            throw new Exception($"Updating Account {Name} failed on save");
        }

        [HttpDelete("byName/{Name}")]
        public async Task<IActionResult> DeleteAccount(int userId, string Name)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var AccountFromRepo = await _repo.GetAccountByName(userId, Name);

            _repo.Delete(AccountFromRepo);

            if (await _repo.SaveAll())
                return Ok("Account item " + AccountFromRepo.Name + " was deleted!");

            throw new Exception($"Deleting Account {Name} failed on save");
        }
    }
}