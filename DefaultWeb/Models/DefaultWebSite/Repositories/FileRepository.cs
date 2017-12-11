using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DefaultWeb.Models.DefaultWebSite.DwsFile;
using DefaultWeb.Data;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using DefaultWeb.Extensions;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace DefaultWeb.Models.DefaultWebSite.Repositories
{
    /// <summary>
    /// 
    /// </summary>
    public class FileRepository : IFileRepository
    {
        public DwsDbContext FileContext { get; set; }
        public ILogger FileLogger { get; set; }
        public DwsSettings Settings { get; set; }
        private IDbContextTransaction FileTransaction { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        /// <param name="settings"></param>
        /// <param name="loggerFactory"></param>
        /// <param name="config"></param>
        public FileRepository(DwsDbContext context, IOptions<DwsSettings> settings, ILoggerFactory loggerFactory, IConfiguration config)
        {
            FileContext = context;
            Settings = settings.Value;
            FileLogger = loggerFactory.CreateLogger("FileRepository");
        }
        
        /// <summary>
        /// Repository will rollback unless committed by caller?
        /// if no transaction started, then what?
        /// </summary>
        ~ FileRepository()
        {
            try
            {
                if (FileTransaction != null)
                {
                    //FileTransaction.Commit();
                }
            }
            catch { }
        }

        /// <summary>
        /// caller defines!!
        /// // TODO use an option here based on user/session type to do this
        /// </summary>
        public void BeginTransaction()
        {
            if ( FileTransaction == null )
            {
                if ( FileContext.Database.CurrentTransaction != null )
                {
                    FileTransaction = FileContext.Database.CurrentTransaction;
                }
                else
                {
                    FileTransaction = FileContext.Database.BeginTransaction();
                }
            }
        }

        /// <summary>
        /// use using here?
        /// </summary>
        public void CommitTransaction()
        {
            if (FileTransaction != null)
            {
                FileTransaction.Commit();
            }
        }

        public void Janitor(string sessionId)
        {
            string sessionDir = String.Format(@"{0}\tmp\{1}", Settings.ServerFileShare, sessionId);
          
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sessionId"></param>
        /// <returns></returns>
        private string GetUploadDir(string sessionId)
        {
            string uploadDir = String.Format(@"{0}\tmp\{1}", Settings.ServerFileShare,sessionId);
            if (!Directory.Exists(uploadDir))
            {
                try
                {
                    Directory.CreateDirectory(uploadDir);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                
            }
            return uploadDir;
        }


        /// <summary>
        /// TODO - effective linking of saved files in FileTable with DwsFIleInfo.....
        /// ???
        /// </summary>
        /// <param name="uploadInfo"></param>
        public List<DwsFileInfo> SaveUploadFiles(DwsFileUpload uploadInfo)
        {
            List<DwsFileInfo> fileInfo = new List<DwsFileInfo>();
            string uploadDir = GetUploadDir(uploadInfo.SessionId);

            foreach (var file in uploadInfo.Files)
            {
                if (file.Length > 0)
                {
                    var fileName = file.FileName;

                    var fileInfoNew = new DwsFileInfo(fileName, uploadDir)
                    {
                        FriendlyName = Path.GetFileNameWithoutExtension(fileName),
                        Description = uploadInfo.Description,
                        CreatedTimestamp = DateTime.UtcNow,
                        UpdatedTimestamp = DateTime.UtcNow,
                        ContentType = file.ContentType,
                        FileSize = file.Length,
                        SessionId = uploadInfo.SessionId
                    };

                    SaveFile(file, fileInfoNew);
                    fileInfo.Add(fileInfoNew);
                }
            }
            return SaveFileInfo(fileInfo);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="file"></param>
        /// <param name="filePath"></param>
        public void SaveFile(IFormFile file, DwsFileInfo fileInfo)
        {
            try
            {
                file.Save(fileInfo.FileFull);
            }
            catch (Exception ex)
            {
                var serverEx = new ServerException() { MiscException = ex };
                throw serverEx;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="files"></param>
        /// <returns></returns>
        private List<DwsFileInfo> SaveFileInfo(List<DwsFileInfo> files)
        {
            try
            {
                FileContext.DwsFileInfo.AddRange(files);
                FileContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            foreach (DwsFileInfo fi in files)
            {
                SetFileInfoExt(fi);
            }

            return files;
        }

        //////////////////////////////////////////////////////
        /// 
        /// //////////////////////////////////////////////////
        /// </summary>
        /// <returns></returns>
        public List<DwsFileInfo> Select(string sessionId)
        {
            // LINQ
            //var files = from f in FileContext.DwsFileInfo
            //               select f;

            try
            {
                // Lambda
                var files = FileContext.DwsFileInfo.Where(f => f.SessionId == sessionId).ToList();
                foreach (DwsFileInfo fi in files)
                {
                    SetFileInfoExt(fi);
                }
                return files.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="sessionId"></param>
        /// <returns></returns>
        public DwsFileInfo Select(int id, string sessionId)
        {
            /// LINQ
            //var fi = from f in FileContext.DwsFileInfo
            //         where f.Id == id && f.SessionId == sessionId
            //         select f;

            try
            {
                ///Lambda
                DwsFileInfo fileinfo = FileContext.DwsFileInfo.Single(f => f.Id == id && f.SessionId == sessionId);
                return SetFileInfoExt(fileinfo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// doing this cause can't get model class to do it after an add, select is OK
        /// TODO bind the Id after add
        /// </summary>
        /// <param name="fileInfo"></param>
        private DwsFileInfo SetFileInfoExt(DwsFileInfo fileinfo)
        {
            fileinfo.FileApi = String.Format(@"/api/dws/files/view/{0}", fileinfo.Id);
            fileinfo.ThumbnailUrl = String.Format(@"/api/dws/files/thumbnail/100/100/{0}", fileinfo.Id);
            var index = fileinfo.ContentType.IndexOf(@"/");
            var category = fileinfo.ContentType.Substring(0, (index));
            var type = fileinfo.ContentType.Substring(index + 1);

            switch (category)
                {
                    case "application":
                        fileinfo.FileTarget = ".main-document";
                        break;

                    case "audio":
                        fileinfo.FileTarget = ".main-audio";
                        break;

                    case "video":
                        fileinfo.FileTarget = ".main-video";
                        break;

                    case "image":
                        fileinfo.FileTarget = ".main-image";
                        break;

                    default:
                        fileinfo.FileTarget = "";
                        break;
                }

            return fileinfo;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int Delete(int id)
        {
            throw new NotImplementedException();
        }

    }

}
