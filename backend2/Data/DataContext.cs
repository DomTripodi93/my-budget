using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) {}

        public DbSet<User> Users { get; set; }

        public DbSet<Transaction> Transactions { get; set; }

        public DbSet<RecurringTransaction> RecurringTransactions { get; set; }

        public DbSet<Account> Accounts { get; set; }

        public DbSet<Settings> Settings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>()
                .HasKey(account => new {account.userId, account.Name});
            modelBuilder.Entity<Settings>()
                .HasKey(s => s.userId);
        }
    }
}
