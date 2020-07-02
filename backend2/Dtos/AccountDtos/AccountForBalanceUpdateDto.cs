using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class AccountForBalanceUpdateDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string AccountType { get; set; }

        public bool Active { get; set; }
    }
}
