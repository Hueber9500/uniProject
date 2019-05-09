using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OOP2
{
    [Table("nm_wallet_category")]
    public class WalletCategory
    {
        [Column("code")]
        [Key]
        public string Code { get; set; }

        [Column("description")]
        public string Description { get; set; }
    }
}
