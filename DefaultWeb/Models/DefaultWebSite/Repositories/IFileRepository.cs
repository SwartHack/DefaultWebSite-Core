using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DefaultWeb.Models.DefaultWebSite.File;
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

        Task<bool> SaveAsync(IFormFile file, string fileFullPath);
        int Delete(int id);
        IEnumerable<DwsFileInfo> SaveFileInfo(IEnumerable<DwsFileInfo> fileInfo);
        IEnumerable<DwsFileInfo> Select();
        IEnumerable<DwsFileInfo> Select(List<string> filenames);
        DwsFileInfo Select(int id);
        DwsFileInfo Select(string fileName);

    }
}
