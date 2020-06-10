using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using System.IO;
using AutoMapper;
using backend.Data;
using backend.Dtos;
using backend.Models;
using CsvHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/{userId}/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ITransactionRepository _repo;
        private readonly IUserRepository _userRepo;

        public TransactionController(IMapper mapper, ITransactionRepository repo, IUserRepository userRepo)
        {
            _mapper = mapper;
            _repo = repo;
            _userRepo = userRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddTransaction(int userId, TransactionForCreationDto TransactionForCreation)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var Transaction = _mapper.Map<Transaction>(TransactionForCreation);

            Transaction.User = creator;
            Transaction.Reconciled = true;

            _repo.Add(Transaction);

            var AccountFromForUpdate = await _repo.GetAccountByName(userId, Transaction.AccountFrom);
            AccountFromForUpdate.Balance -= Transaction.Cost;
            var AccountToForUpdate = await _repo.GetAccountByName(userId, Transaction.AccountTo);
            AccountToForUpdate.Balance += Transaction.Cost;

            if (await _repo.SaveAll())
            {
                var jobToReturn = _mapper.Map<TransactionForReturnDto>(Transaction);
                return CreatedAtRoute("GetTransaction", new { Id = Transaction.Id, userId = userId }, jobToReturn);
            }

            throw new Exception("Creation of Transaction item failed on save");

        }

        [HttpPost("bill")]
        public async Task<IActionResult> AddBill(int userId, TransactionForCreationDto TransactionForCreation)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var Transaction = _mapper.Map<Transaction>(TransactionForCreation);

            Transaction.User = creator;
            Transaction.Reconciled = true;

            _repo.Add(Transaction);
            
            var AccountToForUpdate = await _repo.GetAccountByName(userId, Transaction.AccountTo);
            AccountToForUpdate.Balance += Transaction.Cost;

            if (await _repo.SaveAll())
            {
                var jobToReturn = _mapper.Map<TransactionForReturnDto>(Transaction);
                return CreatedAtRoute("GetTransaction", new { Id = Transaction.Id, userId = userId }, jobToReturn);
            }

            throw new Exception("Creation of Transaction item failed on save");
        }

        [HttpPost("bulk")]
        public async Task<IActionResult> BulkUploadTransactions(int userId, StreamReader TransactionFile)
        {
            var creator = await _userRepo.GetUser(userId);

            if (creator.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var Transactions = new CsvReader(TransactionFile, CultureInfo.InvariantCulture);
            var TransactionsForCreation = Transactions.GetRecords<TransactionForCreationDto>();

            foreach (var Transaction in TransactionsForCreation)
            {
                var TransactionToAdd = _mapper.Map<Transaction>(Transaction);
                _repo.Add(TransactionToAdd);
            }

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            throw new Exception("Creation of Transactions from CSV failed on save");

        }

        [HttpGet("{Id}", Name = "GetTransaction")]
        public async Task<IActionResult> GetTransaction(int userId, int Id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var TransactionFromRepo = await _repo.GetTransaction(Id);

            TransactionForReturnDto TransactionForReturn = _mapper.Map<TransactionForReturnDto>(TransactionFromRepo);

            return Ok(TransactionForReturn);

        }

        [HttpGet("byAccount/{Account}")]
        public async Task<IActionResult> GetTransactionsForAccount(int userId, string Account)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<Transaction> TransactionsFromRepo = await _repo.GetTransactionsByAccount(userId, Account);

            IEnumerable<TransactionForReturnDto> TransactionsForReturn = _mapper.Map<IEnumerable<TransactionForReturnDto>>(TransactionsFromRepo);

            return Ok(TransactionsForReturn);

        }

        [HttpGet("notReconciled")]
        public async Task<IActionResult> GetTransactionsNotReconciled(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<Transaction> TransactionsFromRepo = await _repo.GetTransactionsByReconciled(userId, false);

            IEnumerable<TransactionForReturnDto> TransactionForReturn = _mapper.Map<IEnumerable<TransactionForReturnDto>>(TransactionsFromRepo);

            return Ok(TransactionForReturn);

        }

        [HttpGet("byDate/{Year}/{Month}/{Day}")]
        public async Task<IActionResult> GetTransactionsForDate(int userId, int Year, int Month, int Day)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<Transaction> TransactionsFromRepo = await _repo.GetTransactionsByDate(userId, Year, Month, Day);

            IEnumerable<TransactionForReturnDto> TransactionForReturn = _mapper.Map<IEnumerable<TransactionForReturnDto>>(TransactionsFromRepo);

            return Ok(TransactionForReturn);

        }

        [HttpGet("byMonth/{Year}/{Month}")]
        public async Task<IActionResult> GetTransactionsForMonth(int userId, int Year, int Month, int Day)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            IEnumerable<Transaction> TransactionsFromRepo = await _repo.GetTransactionsByMonth(userId, Year, Month);

            IEnumerable<TransactionForReturnDto> TransactionForReturn = _mapper.Map<IEnumerable<TransactionForReturnDto>>(TransactionsFromRepo);

            return Ok(TransactionForReturn);

        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateTransaction(int userId, int Id, TransactionForUpdateDto TransactionForUpdateDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var TransactionFromRepo = await _repo.GetTransaction(Id);

            if (TransactionFromRepo.AccountFrom != null && TransactionFromRepo.AccountTo != null)
            {
                if (TransactionFromRepo.AccountFrom != TransactionForUpdateDto.AccountFrom)
                {
                    var AccountFromRepoForUpdate = await _repo.GetAccountByName(userId, TransactionFromRepo.AccountFrom);
                    AccountFromRepoForUpdate.Balance += TransactionFromRepo.Cost;
                    var AccountFromDtoForUpdate = await _repo.GetAccountByName(userId, TransactionForUpdateDto.AccountFrom);
                    AccountFromDtoForUpdate.Balance -= TransactionFromRepo.Cost;
                }
                if (TransactionFromRepo.AccountTo != TransactionForUpdateDto.AccountTo)
                {
                    var AccountToRepoForUpdate = await _repo.GetAccountByName(userId, TransactionFromRepo.AccountTo);
                    AccountToRepoForUpdate.Balance -= TransactionFromRepo.Cost;
                    var AccountToDtoForUpdate = await _repo.GetAccountByName(userId, TransactionForUpdateDto.AccountTo);
                    AccountToDtoForUpdate.Balance += TransactionFromRepo.Cost;
                }
            }
            else
            {
                var AccountFromForUpdate = await _repo.GetAccountByName(userId, TransactionForUpdateDto.AccountFrom);
                AccountFromForUpdate.Balance -= TransactionFromRepo.Cost;
                var AccountToForUpdate = await _repo.GetAccountByName(userId, TransactionForUpdateDto.AccountTo);
                AccountToForUpdate.Balance += TransactionFromRepo.Cost;
            }

            _mapper.Map(TransactionForUpdateDto, TransactionFromRepo);

            if (TransactionFromRepo.AccountFrom != null && TransactionFromRepo.AccountTo != null)
            {
                TransactionFromRepo.Reconciled = true;
            }

            if (await _repo.SaveAll())
                return CreatedAtRoute("GetTransaction", new { Id = TransactionFromRepo.Id, userId = userId }, TransactionFromRepo);

            throw new Exception($"Updating Transaction item {Id} failed on save");
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteTransaction(int userId, int Id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var TransactionFromRepo = await _repo.GetTransaction(Id);

            _repo.Delete(TransactionFromRepo);

            if (await _repo.SaveAll())
                return Ok("Transaction item " + TransactionFromRepo.Id + " was deleted!");

            throw new Exception($"Deleting Transaction {Id} failed on save");
        }
    }
}