using Microsoft.AspNetCore.Mvc;
using OOP2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SBDOOP
{
    [Route("/oop")]
    public class OOP:ControllerBase
    {
        private Analyzer _analyzer;

        public OOP(Database db)
        {
            _analyzer = new Analyzer(db);
        }

        [HttpGet]
        public JsonResult Get()
        {
            return new JsonResult(_analyzer.Read().ToList());
        }

        [HttpGet]
        [Route("served_clients")]
        public int CalculateServedClientsCountBySellerName([FromQuery]string name)
        {
            return _analyzer.CalculateServedClientsCountBySellerName(name);
        }

        [HttpGet]
        [Route("served_clients_time")]
        public int CalculateServedClientsTotatTime([FromQuery]string name)
        {
            return _analyzer.CalculateTotalMinutesForServingBySellerName(name);
        }
    }
}
