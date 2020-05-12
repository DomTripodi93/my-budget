namespace backend.Dtos
{
    public class SettingsForCreationDto
    {
        public bool IsNew { get; set; }

        public bool SkipTutorial { get; set; }

        public int TransactionPageSize { get; set; }

        public string AccountPageSize { get; set; }
    }
}