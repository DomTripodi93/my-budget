using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class TransactionForReturnDto
    {
        public int Id { get; set; }

        public float Cost { get; set; }

        public string LastDate { get; set; }

        public Date NextDate { get; set; }

        public string AccountTo { get; set; }

        public string AccountFrom { get; set; }

        public int RecurringInterval { get; set; }
    }
}
