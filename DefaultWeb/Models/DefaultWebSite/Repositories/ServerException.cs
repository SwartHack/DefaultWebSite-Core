using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultWeb.Models.DefaultWebSite.Repositories
{
    public class ServerException : Exception
    {
        public DbUpdateException DbException { get; private set; }
        public ApplicationException AppException { get; private set; }
        public Exception MiscException { get; set; }

        public ServerException()
        {

        }
 
    }
}
