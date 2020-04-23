using System;

namespace backend.Models
{
    public class RecurringTransaction
    {
        public int Id { get; set; }

        public User User { get; set; }

        public int userId { get; set; }

        public string AccountTo { get; set; }

        public string AccountFrom { get; set; }

        public float Cost { get; set; }

        public int RecurringInterval { get; set; }

        public DateTime LastDate { get; set; }

        public DateTime NextDate { get; set; }
    }
}
