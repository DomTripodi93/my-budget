using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class RecurringTransactionForReturnDto
    {
        public int Id { get; set; }

        public float Cost { get; set; }

        public string LastDate { get; set; }

        public DateTime NextDate { get; set; }

        public string AccountTo { get; set; }

        public string AccountFrom { get; set; }

        public int RecurringInterval { get; set; }
    }
}
