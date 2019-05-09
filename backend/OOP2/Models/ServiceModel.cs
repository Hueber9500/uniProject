using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OOP2
{
    [Table("oop_service")]
    public class ServiceModel
    {
        [Column("id")]
        [Key]
        public int Id { get; set; }

        [Column("seller")]
        public string SellerName { get; set; }

        [Column("client")]
        public int Client { get; set; }

        [Column("working_minutes")]
        public int WorkingMinutes { get; set; }
    }
}
