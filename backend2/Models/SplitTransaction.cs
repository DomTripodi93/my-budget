using System;

namespace backend.Models
{
    public class SplitTransaction
    {
        public int Id { get; set; }

        public User User { get; set; }

        public int userId { get; set; }

        public string AccountTo { get; set; }

        public string AccountFrom { get; set; }

        public int SplitFrom { get; set; }

        public float Cost { get; set; }

        public DateTime Date { get; set; }
    }
}
