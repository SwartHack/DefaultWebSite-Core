using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using DefaultWeb.Models.DefaultWebSite.Repositories;
using DefaultWeb.Models.DefaultWebSite.File;
using System.Linq;
using DefaultWeb.Models.DefaultWebSite;
using DefaultWeb.Controllers.Base;

namespace DefaultWeb.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/dws")]
    public class FileOpsController : DwsBaseController
    {
        private IFileRepository FileRepository { get; set; }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileRepository"></param>
        /// <param name="o"></param>
        
        public FileOpsController(IFileRepository fileRepository)
        {
            FileRepository = fileRepository;
        }

        ~FileOpsController()
        {

        }


        [Route("main")]
        public IActionResult Main()
        {
            return PartialView();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileDescriptionShort"></param>
        /// <returns></returns>
        [Route("upload")]
        [HttpPost]
        //[ServiceFilter(typeof(ValidateMimeMultipartContentFilter))]
        public IActionResult UploadFiles(DwsFileUpload uploadInfo)
        {
            try
            {
                var fileInfo = new List<DwsFileInfo>();

                TryValidateModel(uploadInfo);

                if (ModelState.IsValid)
                {
                    // http://www.mikesdotnetting.com/article/288/asp-net-5-uploading-files-with-asp-net-mvc-6
                    // http://dotnetthoughts.net/file-upload-in-asp-net-5-and-mvc-6/
                    foreach (var file in uploadInfo.Files)
                    {
                        if (file.Length > 0)
                        {
                            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.ToString().Trim('"');
                            var filePath = Path.Combine(Settings.Value.ServerFileShare, fileName);
                            var task = FileRepository.SaveAsync(file, filePath );

                            if (task.Result)
                            {
                                fileInfo.Add(new DwsFileInfo() {
                                    FileName = fileName,
                                    FriendlyName = fileName,
                                    Description = uploadInfo.Description,
                                    CreatedTimestamp = DateTime.UtcNow,
                                    UpdatedTimestamp = DateTime.UtcNow,
                                    ContentType = file.ContentType,
                                    FileSize = file.Length,
                                    FileUrl = "/api/dws/view/{Id}",
                                    ThumbnailUrl = "/api/dws/thumbnail/120/120/{Id}"
                                });
                            }
                            else
                            {
                                Response.StatusCode = 500;
                                return Json(new ServerException() { MiscException = task.Exception });
                            }
                        }
                    }

                    FileRepository.SaveFileInfo(fileInfo);
                    return Json(fileInfo);
                }
                else
                {
                    Response.StatusCode = 201;
                    return Json(ModelState.ValidationState);
                }

               
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                var serverEx = new ServerException() { MiscException = ex };
                return Json(serverEx);
            }
        }

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