using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class AccountForUpdateDto
    {
        [Required]
        public bool Active { get; set; }
    }
}
