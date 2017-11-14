using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DefaultWeb.Models.DefaultWebSite.DwsFile;
using Microsoft.AspNetCore.Http;
using DefaultWeb.Data;
using Microsoft.Extensions.Logging;

namespace DefaultWeb.Models.DefaultWebSite.Repositories
{
    public interface IFileRepository
    {
        DwsDbContext FileContext { get; set; }
        ILogger FileLogger { get; set; }
        DwsSettings Settings { get; set; }

        void BeginTransaction();
        void CommitTransaction();
        //void RollbackTransaction();

        List<DwsFileInfo> SaveUploadFiles(DwsFileUpload uploadInfo);
        //Task<bool> SaveAsync(IFormFile file, string filePath, string fileName);

        List<DwsFileInfo> Select(string sessionId);
        DwsFileInfo Select(int id, string sessionId);

        int Delete(int id);
        void Janitor(string sessionId);
    }
}
