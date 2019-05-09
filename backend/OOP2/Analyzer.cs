using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace OOP2
{
    public class Analyzer: ICrud<Service>
    {
        private ICollection<Service> _services;

        private Database _db;

        public Analyzer(Database db)
        {
            _services = new List<Service>();
            _db = db;
            Read();
        }

        public void Commit()
        {
            _db.SaveChanges();
        }

        public void Delete(int id)
        {
            var entity = _db.ServiceModels.FirstOrDefault(sm => sm.Id == id);

            if (entity == null) return;

            _db.ServiceModels.Remove(entity);
        }

        public void Update(Service obj, int id)
        {
            var entity = _db.ServiceModels.FirstOrDefault(sm => sm.Id == id);

            if (entity == null) return;

            entity.Client = obj.Client;
            entity.SellerName = obj.Seller;
            entity.WorkingMinutes = obj.Minutes;

            _db.ServiceModels.Update(entity);
        }

        public IEnumerable<Service> Read()
        {
            _services = _db.ServiceModels
                .Select(sm => new Service(sm.SellerName, sm.Client, sm.WorkingMinutes))
                .ToList();

            return _services;
        }

        public int CalculateServedClientsCountBySellerName(string sellerName)
        {
            return _services.Count();
        }

        public int CalculateTotalMinutesForServingBySellerName(string sellerName)
        {
            return _services.Sum(item => item.Minutes);
        }

        public List<int> GetClientsServedBySeller(string sellerName)
        {
            return _services
                .Select(item => item.Client)
                .ToList();
        }
    }
}
