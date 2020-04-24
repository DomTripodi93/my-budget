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
    public class RecurringTransactionController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ITransactionRepository _repo;
        private readonly IUserRepository _userRepo;

        public RecurringTransactionController(IMapper mapper, ITransactionRepository repo, IUserRepository userRepo)
        {
            _mapper = mapper;
            _repo = repo;
            _userRepo = userRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddRecurringTransaction(int userId, RecurringTransactionForCreationDto RecurringTransactionForCreation)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var RecurringTransaction = _mapper.Map<RecurringTransaction>(RecurringTransactionForCreation);

            RecurringTransaction.User = creator;

            _repo.Add(RecurringTransaction);

            if (await _repo.SaveAll())
            {
                var jobToReturn = _mapper.Map<RecurringTransactionForReturnDto>(RecurringTransaction);
                return CreatedAtRoute("GetRecurringTransaction", new { Id = RecurringTransaction.Id, userId = userId }, jobToReturn);
            }

            throw new Exception("Creation of RecurringTransaction item failed on save");

        }

        [HttpGet("{Id}", Name = "GetRecurringTransaction")]
        public async Task<IActionResult> GetRecurringTransaction(int userId, int Id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var RecurringTransactionFromRepo = await _repo.GetRecurringTransaction(Id);

            RecurringTransactionForReturnDto RecurringTransactionForReturn = _mapper.Map<RecurringTransactionForReturnDto>(RecurringTransactionFromRepo);

            return Ok(RecurringTransactionForReturn);

        }

        [HttpGet("byUser")]
        public async Task<IActionResult> GetRecurringTransactionsForUser(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<RecurringTransaction> RecurringTransactionsFromRepo = await _repo.GetRecurringTransactions(userId);

            IEnumerable<RecurringTransactionForReturnDto> RecurringTransactionsForReturn = _mapper.Map<IEnumerable<RecurringTransactionForReturnDto>>(RecurringTransactionsFromRepo);

            return Ok(RecurringTransactionsForReturn);

        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateRecurringTransaction(int userId, int Id, RecurringTransactionForCreationDto RecurringTransactionForUpdateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var RecurringTransactionFromRepo = await _repo.GetRecurringTransaction(Id);

            _mapper.Map(RecurringTransactionForUpdateDto, RecurringTransactionFromRepo);

            if (await _repo.SaveAll())
                return CreatedAtRoute("GetRecurringTransaction", new { Id = RecurringTransactionFromRepo.Id, userId = userId }, RecurringTransactionFromRepo);

            throw new Exception($"Updating RecurringTransaction item {Id} failed on save");
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteRecurringTransaction(int userId, int Id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var RecurringTransactionFromRepo = await _repo.GetRecurringTransaction(Id);

            _repo.Delete(RecurringTransactionFromRepo);

            if (await _repo.SaveAll())
                return Ok("RecurringTransaction item " + RecurringTransactionFromRepo.Id + " was deleted!");

            throw new Exception($"Deleting RecurringTransaction {Id} failed on save");
        }
    }
}