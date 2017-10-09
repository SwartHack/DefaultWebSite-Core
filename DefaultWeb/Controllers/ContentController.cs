using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DefaultWeb.Models.DefaultWebSite.Repositories;
using DefaultWeb.Models.DefaultWebSite;
using Microsoft.Extensions.Options;
using System.IO;
using DefaultWeb.Controllers.ActionResults;
using Microsoft.AspNetCore.Http;
using DefaultWeb.Models.DefaultWebSite.File;
using System.Security.Cryptography;
using System.Text;
using DefaultWeb.Controllers.Base;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DefaultWeb.Controllers
{
    [Route("api/dws")]
    public class ContentController : DwsBaseController
    {
        private IFileRepository FileRepository { get; set; }

        public ContentController(IFileRepository fileRepository)
        {
            FileRepository = fileRepository;
        }


        [Route("list")]
        [HttpGet]
        public IActionResult List()
        {
            var files = FileRepository.Select();
            return Json(new { fileInfo = files.ToList() });
        }


        [Route("view/{id}")]
        [HttpGet]
        public IActionResult Download(int id)
        {
            var fileInfo = FileRepository.Select(id);
            var fileNameFull = Path.Combine(Settings.Value.ServerFileShare, fileInfo.FileName);

            // result based on mime type

            // check for video format
            if (fileInfo.ContentType.Contains(@"video/"))
            {
                return new VideoResult(fileNameFull, fileInfo.ContentType);
            }

            if (fileInfo.ContentType.Contains(@"application/"))
            {
                return File(fileInfo.FileName, fileInfo.ContentType);
                //return new DocViewResult(this, fileInfo);
            }

            if (fileInfo.ContentType.Contains(@"image/"))
            {
                return File(fileNameFull, fileInfo.ContentType);
                //return new ImageViewResult(fileInfo);
            }

            Response.StatusCode = 404;
            return Content("Error:unsuported mimetype!!!");
        }


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

            var fileInfo = FileRepository.Select(id);
            var fileNameFull = Path.Combine(Settings.Value.ServerFileShare, fileInfo.FileName);

            return new ThumbnailResult(width, height, fileNameFull, fileInfo.ContentType);
        }

        private static string GetMD5(string str)
        {
            MD5 md5 = MD5CryptoServiceProvider.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] stream = null;
            StringBuilder sb = new StringBuilder();
            stream = md5.ComputeHash(encoding.GetBytes(str));
            for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
            return sb.ToString();
        }


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

    }
}
