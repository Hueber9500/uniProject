using System;
using System.Collections.Generic;
using System.Text;

namespace OOP2
{
    public class Service : IComparable<Service>
    {
        #region Field members
        
        private string _sellerName;
        private int _clientNumber;
        private int _serviceDurationInMinutes;
        
        #endregion

        #region Constructors
        /// <summary>
        /// Explicit constructor
        /// </summary>
        /// <param name="sellerName"></param>
        /// <param name="clientNumber"></param>
        /// <param name="minutes"></param>
        public Service(string sellerName, int clientNumber, int minutes)
        {
            Seller = sellerName;
            Client = clientNumber;
            Minutes = minutes;
        }

        /// <summary>
        /// Default Constructor
        /// </summary>
        public Service()
            : this(default(string), default(int), default(int))
        {

        }
        #endregion

        #region Public properties
        public string Seller { get => _sellerName; private set => _sellerName = value; }
        public int Client { get => _clientNumber; private set => _clientNumber = value; }
        public int Minutes { get => _serviceDurationInMinutes; private set => _serviceDurationInMinutes = value; }
        #endregion

        #region Comparison operators
        public int CompareTo(Service obj)
        {
            if (this < obj)
            {
                return -1;
            }
            else if (this == obj)
            {
                return 0;
            }
            else
                return 1;
        }

        public override bool Equals(object obj)
        {
            var service = obj as Service;
            return service != null &&
                   _sellerName == service._sellerName;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(_sellerName);
        }

        public static bool operator == (Service lhs, Service rhs)
        {
            return lhs.Seller == rhs.Seller;
        }
        public static bool operator != (Service lhs, Service rhs)
        {
            return lhs.Seller != rhs.Seller;
        }
        public static bool operator < (Service lhs, Service rhs)
        {
            if(lhs == rhs)
            {
                if(lhs.Client < rhs.Client)
                {
                    return true;
                }
            }

            if(lhs.Seller.CompareTo(rhs.Seller) < 0 && lhs.Client < rhs.Client)
            {
                return true;
            }

            return false;
        }
        public static bool operator >(Service lhs, Service rhs)
        {
            return !(lhs < rhs);
        }

        #endregion

        public static Service GenerateServiceByName(string seller)
        {
            var service = new Service();
            service.Seller = seller;

            return service;
        }
    }
}
