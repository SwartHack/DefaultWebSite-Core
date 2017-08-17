using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultWeb.Models.DefaultWebSite
{
    public class ServerError
    {
        public DbUpdateException DbException { get; set; }
    }
}
