using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SBDOOP
{
    public class DbCtx: DbContext
    {
        public DbCtx(DbContextOptions<DbCtx> options):
            base(options)
        {

        }
    }
}
