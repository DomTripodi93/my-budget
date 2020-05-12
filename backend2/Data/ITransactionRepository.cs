using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Data
{
    public interface ITransactionRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<Account> GetAccountByName(int userId, string name);
        Task<IEnumerable<Account>> GetAccountsByUser(int userId);
        Task<IEnumerable<Account>> GetAccountsByType(int userId, string type);
        Task<Transaction> GetTransaction(int id);
        Task<IEnumerable<Transaction>> GetTransactionsByDate(int userId, int year, int month, int day);
        Task<IEnumerable<Transaction>> GetTransactionsByMonth(int userId, int year, int month);
        Task<IEnumerable<Transaction>> GetTransactionsByReconciled(int userId, bool reconciled);
        Task<IEnumerable<Transaction>> GetTransactionsByAccount(int userId, string account);
        Task<RecurringTransaction> GetRecurringTransaction(int id);
        Task<IEnumerable<RecurringTransaction>> GetRecurringTransactions(int userId);
    }
}