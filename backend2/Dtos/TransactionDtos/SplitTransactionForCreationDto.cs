using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class SplitTransactionForCreationDto
    {
        [Required]
        public float Cost { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string AccountTo { get; set; }

        [Required]
        public string AccountFrom { get; set; }

        [Required]
        public int SplitFrom { get; set; }
    }
}
