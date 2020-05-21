using System;

namespace backend.Dtos
{
    public class TransactionForUpdateDto
    {
        public string AccountTo { get; set; }

        public string AccountFrom { get; set; }

        public string Memo { get; set; }

        public string Note { get; set; }

        public bool Reconciled { get; set; }
    }
}
