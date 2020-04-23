using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class TransactionForCreationDto
    {
        [Required]
        public float Cost { get; set; }

        [Required]
        public string LastDate { get; set; }

        [Required]
        public string AccountTo { get; set; }

        [Required]
        public string AccountFrom { get; set; }

        [Required]
        public int RecurringInterval { get; set; }
    }
}
