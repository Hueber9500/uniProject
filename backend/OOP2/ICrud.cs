using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace OOP2
{
    public interface ICrud<T> where T: class
    {
        IEnumerable<T> Read();

        void Update(T obj, int id);

        void Delete(int id);

        void Add(T obj);

        void Commit();

        int CalculateServedClientsCountBySellerName(string name);

        int CalculateTotalMinutesForServingBySellerName(string name);
    }
}
