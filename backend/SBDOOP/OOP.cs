using Microsoft.AspNetCore.Mvc;
using OOP2;
using SBDOOP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SBDOOP
{
    [Route("/oop")]
    public class OOP:ControllerBase
    {
        private ICrud<Service> _analyzer;

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

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _analyzer.Delete(id);
            _analyzer.Commit();
        }

        [HttpPost]
        public void Add([FromBody]AddServiceModel model)
        {
            var obj = new Service(model.Seller, model.Client, model.WorkingMinutes);
            _analyzer.Add(obj);
            _analyzer.Commit();
        }
    }
}
