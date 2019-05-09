using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace SBDOOP.Models
{
    [DataContract]
    public class AddServiceModel
    {
        [DataMember(Name = "seller")]
        public string Seller { get; set; }

        [DataMember(Name = "client")]
        public int Client { get; set; }

        [DataMember(Name = "minutes")]
        public int WorkingMinutes { get; set; }
    }
}
