using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SBDOOP.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace SBDOOP
{
    [Route("/sbd")]
    public class SBD : ControllerBase
    {
        private DbCtx _ctx;

        public SBD(DbCtx ctx)
        {
            _ctx = ctx;
        }

        [HttpGet]
        public IEnumerable<ConductingInfo> Get()
        {
            List<ConductingInfo> info = new List<ConductingInfo>();

            using (var cmd = _ctx.Database.GetDbConnection().CreateCommand())
            {
                cmd.CommandText = "SELECT [day] ,[start_time],[discipline],[teacher],[hall],[group],[description] FROM [dbo].[Conducting_Occupation] ORDER BY day";
      
                _ctx.Database.OpenConnection();

                using (var reader = cmd.ExecuteReader())
                {
                    if(reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            info.Add(new ConductingInfo()
                            {
                                day = reader.GetString(0),
                                start_time = reader.GetString(1),
                                discipline = reader.GetString(2),
                                teacher = reader.GetString(3),
                                hall = reader.GetString(4),
                                group = reader.GetString(5),
                                exercise_type = reader.GetString(6)
                            });                
                        }
                    }
                }

                _ctx.Database.CloseConnection();
            }

            return info;
        }
    }
}
