using System;

namespace backend.Models
{
    public class Transaction
    {
        public int Id { get; set; }

        public User User { get; set; }

        public int userId { get; set; }

        public string AccountTo { get; set; }

        public string AccountFrom { get; set; }

        public int Cost { get; set; }

        public bool Reconciled { get; set; }

        public DateTime Date { get; set; }
    }
}
