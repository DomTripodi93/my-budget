namespace backend.Dtos
{
    public class AccountForReturnDto
    {
        public string Name { get; set; }

        public string AccountType { get; set; }

        public bool Active { get; set; }
        
        public float Balance { get; set; }
    }
}
