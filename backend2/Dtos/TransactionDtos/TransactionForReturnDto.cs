using System;

namespace backend.Dtos
{
    public class TransactionForReturnDto
    {
        public int Id { get; set; }

        public string AccountTo { get; set; }

        public string AccountFrom { get; set; }

        public float Cost { get; set; }

        public bool Reconciled { get; set; }

        public DateTime Date { get; set; }
    }
}
