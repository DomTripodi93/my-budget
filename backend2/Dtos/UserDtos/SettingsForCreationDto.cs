namespace backend.Dtos
{
    public class SettingsForCreationDto
    {
        public bool IsNew { get; set; }

        public int TransactionPageSize { get; set; }

        public int AccountPageSize { get; set; }
    }
}