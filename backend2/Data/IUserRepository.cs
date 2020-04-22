using System.Threading.Tasks;
using backend.Helpers;
using backend.Models;

namespace backend.Data
{
    public interface IUserRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<User> GetUser(int id);
        
    }
}