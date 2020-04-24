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

        public AccountController(IMapper mapper, ITransactionRepository repo, IUserRepository userRepo){
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

            _repo.Add(Account);

            if (await _repo.SaveAll())
            {
                var jobToReturn = _mapper.Map<AccountForReturnDto>(Account);
                return CreatedAtRoute("GetAccount", new {Id = Account.Id, userId = userId }, jobToReturn);
            }
            
            throw new Exception("Creation of Account item failed on save");

        }

        [HttpGet("{Id}", Name="GetAccount")]
        public async Task<IActionResult> GetAccount(int userId, int Id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var AccountFromRepo = await _repo.GetAccount(Id);

            AccountForReturnDto AccountForReturn = _mapper.Map<AccountForReturnDto>(AccountFromRepo);

            return Ok(AccountForReturn);

        }

        [HttpGet("byUser")]
        public async Task<IActionResult> GetAccountsByEmployee(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<Account> AccountsFromRepo = await _repo.GetAccountsForUser(userId);

            IEnumerable<AccountForReturnDto> AccountsForReturn = _mapper.Map<IEnumerable<AccountForReturnDto>>(AccountsFromRepo);

            return Ok(AccountsForReturn);

        }

        [HttpGet("byType/{Type}")]
        public async Task<IActionResult> GetAccounts(int userId, string Type)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<Account> AccountsFromRepo = await _repo.GetAccountsByType(userId, Type);

            IEnumerable<AccountForReturnDto> AccountForReturn = _mapper.Map<IEnumerable<AccountForReturnDto>>(AccountsFromRepo);

            return Ok(AccountForReturn);

        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateAccount(int userId, int Id, AccountForCreationDto AccountForUpdateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var AccountFromRepo = await _repo.GetAccount(Id);

            _mapper.Map(AccountForUpdateDto, AccountFromRepo);

            if (await _repo.SaveAll())
                return CreatedAtRoute("GetAccount", new {Id = AccountFromRepo.Id, userId = userId }, AccountFromRepo);

            throw new Exception($"Updating Account item {Id} failed on save");
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteAccount(int userId, int Id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var AccountFromRepo = await _repo.GetAccount(Id);
            
            _repo.Delete(AccountFromRepo);
            
            if (await _repo.SaveAll())
                return Ok("Account item " + AccountFromRepo.Id + " was deleted!");
        
            throw new Exception($"Deleting Account {Id} failed on save");
        }
    }
}