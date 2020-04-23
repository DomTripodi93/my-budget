using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class TransactionForCreationDto
    {
        [Required]
        public float Cost { get; set; }

        [Required]
        public string Date { get; set; }

        public string AccountTo { get; set; }

        public string AccountFrom { get; set; }

        public bool Reconciled { get; set; }

        public int RecurringInterval { get; set; }

        public Date LastDate { get; set; }
    }
}
