using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using DefaultWeb.Models.DefaultWebSite.Repositories;
using DefaultWeb.Models.DefaultWebSite.DwsFile;
using System.Linq;
using DefaultWeb.Models.DefaultWebSite;
using DefaultWeb.Controllers.Base;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using DefaultWeb.Controllers.ActionResults;

namespace DefaultWeb.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/dws/files")]
    public class FileOpsController : DwsBaseController
    {
        private IFileRepository FileRepository { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileRepository"></param>
        /// <param name="env"></param>
        /// <param name="settings"></param>
        /// <param name="config"></param>
        public FileOpsController(IFileRepository fileRepository, IHostingEnvironment env, IOptions<DwsSettings> settings, IConfiguration config) : base(env, settings)
        {
            FileRepository = fileRepository;
            FileRepository.BeginTransaction();
        }

        ~FileOpsController()
        {
            //FileRepository.Rollback();
            //FileRepository.CommitTransaction();
            //FileRepository.Janitor(HttpContext.Session.Id);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("main")]
        public IActionResult Main()
        {
            try
            {
                return PartialView("~/Views/FileOperations/FileOperationsMain.cshtml");
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                var serverEx = new ServerException() { MiscException = ex };
                return PartialView("~/Views/Shared/_ServerError.cshtml", serverEx); ;
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="uploadInfo"></param>
        /// <returns></returns>
        [Route("upload")]
        [HttpPost]
        [ValidateAntiForgeryToken]
        //[ServiceFilter(typeof(ValidateMimeMultipartContentFilter))]
        public IActionResult UploadFiles(DwsFileUpload uploadInfo)
        {
            try
            {
                uploadInfo.SessionId = Request.Cookies["DwsSessionToken"];
                List<DwsFileInfo> fileinfo = FileRepository.SaveUploadFiles(uploadInfo);
                FileRepository.CommitTransaction(); //like to avoid this, but can't share transaction with Ajax!!?? TODO
                Response.StatusCode = 200;
                return Json(fileinfo);

            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                var serverEx = new ServerException() { MiscException = ex };
                return PartialView("~/Views/Shared/_ServerError.cshtml", serverEx); ;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("list")]
        [HttpGet]
        public IActionResult List()
        {
            var files = FileRepository.Select(Request.Cookies["DwsSessionToken"]);
            return Json(files.ToList());
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("view/{id}")]
        [HttpGet]
        public IActionResult Download(int id)
        {
            var fileInfo = FileRepository.Select(id, Request.Cookies["DwsSessionToken"]);

            // check for video format
            if (fileInfo.ContentType.Contains(@"video/"))
            {
                return new VideoResult(fileInfo.FileFull, fileInfo.ContentType);
            }

            if (fileInfo.ContentType.Contains(@"application/"))
            {
                return File(fileInfo.FileName, fileInfo.ContentType);
                //return new DocViewResult(this, fileInfo);
            }

            if (fileInfo.ContentType.Contains(@"image/"))
            {

                var imageFileStream = System.IO.File.OpenRead(fileInfo.FileFull);
                return File(imageFileStream, fileInfo.ContentType);
                //return new ImageViewResult(fileInfo);
            }

            Response.StatusCode = 404;
            return Content("Error:unsuported file type!!!");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="width"></param>
        /// <param name="height"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("thumbnail/{width}/{height}/{id}")]
        [HttpGet]
        public IActionResult Thumbnail(int width, int height, int id)
        {
            //string CacheFilePath = "";

            //if (Settings.UseHardCacheInDisk)
            //{
            //    string fileCacheIdentifier = GetMD5(id) + "_w" + width + "_h" + height + ".jpg";
            //    CacheFilePath = Path.Combine(Settings.CacheFolderPhysicalPath, fileCacheIdentifier);
            //    if (System.IO.File.Exists(CacheFilePath))
            //        SetCache(Response, CacheFilePath);
            //}

            var fileInfo = FileRepository.Select(id, Request.Cookies["DwsSessionToken"]);

            return new ThumbnailResult(width, height, fileInfo);
        }

        //private static string GetMD5(string str)
        //{
        //    MD5 md5 = MD5CryptoServiceProvider.Create();
        //    ASCIIEncoding encoding = new ASCIIEncoding();
        //    byte[] stream = null;
        //    StringBuilder sb = new StringBuilder();
        //    stream = md5.ComputeHash(encoding.GetBytes(str));
        //    for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
        //    return sb.ToString();
        //}


        //private void SetCache(HttpResponse response, string filepath)
        //{
        //    int expirationDays = 10;

        //    response.ContentType = "image/jpeg";  // this will always be an image

        //    response.Cache.SetCacheability(HttpCacheability.Public);
        //    response.Cache.SetExpires(DateTime.Now.AddDays(expirationDays));
        //    response.Cache.SetValidUntilExpires(true);
        //    response.Cache.SetSlidingExpiration(true);
        //    response.Cache.SetMaxAge(TimeSpan.FromDays(expirationDays));

        //    response.AddFileDependency(filepath);
        //}

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        //[Route("download/{id}")]
        //[HttpGet]
        //public FileStreamResult Download(int id)
        //{
        //    var fileInfo = FileRepository.Select(id);
        //    var path = String.Format(@"{0}\{1}", Settings.ServerFileShare, fileInfo.FileName);
        //    var stream = new FileStream(path, FileMode.Open);
        //    return File(stream, fileInfo.ContentType);
        //}
    }
}