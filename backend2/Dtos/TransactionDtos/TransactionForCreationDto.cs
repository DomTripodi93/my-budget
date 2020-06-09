using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class TransactionForCreationDto
    {
        [Required]
        public float Cost { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public string AccountTo { get; set; }

        public string AccountFrom { get; set; }

        public string Description { get; set; }

        public string Note { get; set; }

        public bool Reconciled { get; set; }
    }
}
