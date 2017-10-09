using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DefaultWeb.Models.DefaultWebSite.File;
using DefaultWeb.Data;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using DefaultWeb.Extensions;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.Extensions.Options;
using DefaultWeb.Controllers.ActionResults;

namespace DefaultWeb.Models.DefaultWebSite.Repositories
{

    public class FileRepository : IFileRepository
    {

        public DwsDbContext FileContext { get; set; }
        public  ILogger FileLogger { get; set; }
        public DwsSettings Settings { get; set; }

        public FileRepository(DwsDbContext context, IOptions<DwsSettings> settings, ILoggerFactory loggerFactory)
        {
            FileContext = context;
            Settings = settings.Value;
            FileLogger = loggerFactory.CreateLogger("FileRepository");
        }


        public IEnumerable<DwsFileInfo> SaveFileInfo(IEnumerable<DwsFileInfo> fileInfo)
        {
            FileContext.DwsFileInfo.AddRange(fileInfo);
            FileContext.SaveChanges();
            return fileInfo;
        }

        public async Task<bool> SaveAsync(IFormFile file, string fileFullPath)
        {
            try
            {
                // Extension method update RC2 has removed this
                // what does that mean EKS??
                await file.SaveAsAsync(fileFullPath);
                return true;
            }
            catch (Exception ex)
            {
                var serverEx = new ServerException() { MiscException = ex };
                throw (serverEx);
            }

        }

        public int Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<DwsFileInfo> Select()
        {
            var list = from f in FileContext.DwsFileInfo
                       select f;
            //var list = FileContext.DwsFileInfo.Select(t => new DwsFileInfo());
            return list;
        }

        public IEnumerable<DwsFileInfo> Select(List<string> filenames)
        {
            var x = FileContext.DwsFileInfo.Where(r => filenames.Contains(r.FileName));
            return x.Select(t => new DwsFileInfo { Id = t.Id, Description = t.Description });
        }

        public DwsFileInfo Select(int id)
        {
            return FileContext.DwsFileInfo.Single(t => t.Id == id);
        }

        public DwsFileInfo Select(string fileName )
        {
            return FileContext.DwsFileInfo.Single(t => t.FileName == fileName);
        }

      

        

        

       

        

        
    }

}
