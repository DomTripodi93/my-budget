using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        
        public TransactionRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Account> GetAccount(int id)
        {
            var account = await _context.Accounts
                .Where(acct => acct.Id == id)
                .FirstOrDefaultAsync();
            
            return account;
        }

        public async Task<Account> GetAccountByName(int userId, string name)
        {
            var account = await _context.Accounts
                .Where(account => account.userId == userId)
                .Where(account => account.Name == name)
                .FirstOrDefaultAsync();
            
            return account;
        }

        public async Task<IEnumerable<Account>> GetAccountsByType(int userId, string type)
        {
            var accounts = await _context.Accounts
                .Where(account => account.userId == userId)
                .Where(account => account.AccountType == type)
                .ToListAsync();
            
            return accounts.OrderBy(account => account.Name);
        }

        public async Task<IEnumerable<Account>> GetAccountsByUser(int userId)
        {
            var accounts = await _context.Accounts
                .Where(account => account.userId == userId)
                .ToListAsync();
            
            return accounts.OrderBy(account => account.Name);
        }

        public async Task<Transaction> GetTransaction(int id)
        {
            var transaction = await _context.Transactions
                .Where(trans => trans.Id == id)
                .FirstOrDefaultAsync();
            
            return transaction;
        }

        public async Task<IEnumerable<Transaction>> GetTransactionsByAccount(int userId, string account)
        {
            var transactionsTo = await _context.Transactions
                .Where(transaction => transaction.userId == userId)
                .Where(transaction => transaction.AccountTo == account)
                .ToListAsync();

            var transactionsFrom = await _context.Transactions
                .Where(transaction => transaction.userId == userId)
                .Where(transaction => transaction.AccountFrom == account)
                .ToListAsync();

            var transactionsAll = transactionsTo.Concat(transactionsFrom).ToList();
            
            return transactionsAll.OrderBy(transaction => transaction.Date);
        }

        public async Task<IEnumerable<Transaction>> GetTransactionsByDate(int userId, int year, int month, int day)
        {
            var transactions = await _context.Transactions
                .Where(transaction => transaction.userId == userId)
                .Where(transaction => transaction.Date.Year == year)
                .Where(transaction => transaction.Date.Month == month)
                .Where(transaction => transaction.Date.Day == day)
                .ToListAsync();
            
            return transactions.OrderBy(transaction => transaction.Date);
        }

        public async Task<IEnumerable<Transaction>> GetTransactionsByMonth(int userId, int year, int month)
        {
            var transactions = await _context.Transactions
                .Where(transaction => transaction.userId == userId)
                .Where(transaction => transaction.Date.Year == year)
                .Where(transaction => transaction.Date.Month == month)
                .ToListAsync();
            
            return transactions.OrderBy(transaction => transaction.Date);
        }

        public async Task<IEnumerable<Transaction>> GetTransactionsByReconciled(int userId, bool reconciled)
        {
            var transactions = await _context.Transactions
                .Where(transaction => transaction.userId == userId)
                .Where(transaction => transaction.Reconciled == reconciled)
                .ToListAsync();
            
            return transactions.OrderBy(transaction => transaction.Date);
        }

        public async Task<RecurringTransaction> GetRecurringTransaction(int id)
        {
            var recurringTransaction = await _context.RecurringTransactions
                .Where(recurringTrans => recurringTrans.Id == id)
                .FirstOrDefaultAsync();
            
            return recurringTransaction;
        }

        public async Task<IEnumerable<RecurringTransaction>> GetRecurringTransactions(int userId)
        {
            var recurringTransaction = await _context.RecurringTransactions
                .Where(recurringTrans => recurringTrans.userId == userId)
                .ToListAsync();
            
            return recurringTransaction.OrderByDescending(recurringTrans => recurringTrans.LastDate);
        }

        
    }
}