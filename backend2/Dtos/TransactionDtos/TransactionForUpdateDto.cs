namespace backend.Dtos
{
    public class TransactionForUpdateDto
    {
        public string AccountTo { get; set; }

        public string AccountFrom { get; set; }

        public bool Reconciled { get; set; }
    }
}
