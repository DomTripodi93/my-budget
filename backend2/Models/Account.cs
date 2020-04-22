namespace backend.Models
{
    public class Account
    {
        public int Id { get; set; }

        public User User { get; set; }

        public int userId { get; set; }

        public string Name { get; set; }

        public string AccountType { get; set; }

        public bool Active { get; set; }
    }
}
