using System;

namespace backend.Dtos
{
    public class TransactionForCreationDto
    {
        public int Id { get; set; }

        public float Cost { get; set; }

        public DateTime Date { get; set; }

        public string AccountTo { get; set; }

        public string AccountFrom { get; set; }

        public int SplitFrom { get; set; }
    }
}
