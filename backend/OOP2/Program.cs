using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OOP2
{
    class Program
    {
        static void Main(string[] args)
        {
            Database db = new Database("Data Source=DEV-IC4-DB03\\DEVIC4DB03,20000;Initial Catalog=ipmain;Integrated Security=SSPI;");

            var x = db.WalletCategories.ToList();
        }
    }
}
