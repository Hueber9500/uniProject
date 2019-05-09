using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace OOP2
{
    public class Database:DbContext
    {
        public Database(string connectionString)
            : base(new DbContextOptionsBuilder<Database>().UseSqlServer(connectionString).Options)
        {
               
        }

        public DbSet<WalletCategory> WalletCategories { get; set; }

        public DbSet<ServiceModel> ServiceModels { get; set; }
    }
}
