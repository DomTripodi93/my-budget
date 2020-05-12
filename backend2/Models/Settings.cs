using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Settings
    {
        public User User { get; set; }
        public int userId { get; set; }
        public bool IsNew { get; set; }
        public bool SkipTutorial { get; set; }
        public int TransactionPageSize { get; set; }
        public string AccountPageSize { get; set; }
    }
}