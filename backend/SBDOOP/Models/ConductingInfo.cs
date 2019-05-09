using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace SBDOOP.Models
{
    [DataContract(Name = "conducting")]
    public class ConductingInfo
    {
        [DataMember]
        public string day;
        [DataMember]
        public string start_time;
        [DataMember]
        public string discipline;
        [DataMember]
        public string teacher;
        [DataMember]
        public string hall;
        [DataMember]
        public string group;
        [DataMember]
        public string exercise_type;
    }
}
