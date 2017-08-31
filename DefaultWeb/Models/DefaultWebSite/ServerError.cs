using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultWeb.Models.DefaultWebSite
{
    public class ServerError
    {

        public ServerError()
        {

        }
     

        public DbUpdateException DbException { get; set; }
        public ApplicationException AppException { get; set; }
        public Exception MiscException { get; set; }

        
    }
}
