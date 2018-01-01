using DefaultWeb.Models.DefaultWebSite;
using DefaultWeb.Models.DefaultWebSite.DwsFile;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NReco.VideoConverter;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultWeb.Controllers.ActionResults
{
    public class VideoResult : ActionResult
    {
        public string FileNameFull { get; set; }
        public string MimeType { get; set; }
        private FFMpegConverter Converter { get; set; }

        public VideoResult(string fileFullName, string mimeType, FFMpegConverter converter)
        {
            FileNameFull = fileFullName;
            MimeType = mimeType;
            Converter = converter;
        }

        /// <summary>
        /// all video live stream converted to ogg or webm
        /// </summary>
        /// <param name="context"></param>
        public override void ExecuteResult(ActionContext context)
        {
            //string headerval = string.Format("attachment; filename={0}", DwsFile);
            //context.HttpContext.Response.Headers.Add("Content-Disposition", headerval);
            context.HttpContext.Response.Headers.Add("Content-Type", "video/ogg");

            //get the stream from DwsFileTable
            try
            {
                var ffMpegTask = Converter.ConvertLiveMedia(
                    FileNameFull,
                    null,
                    context.HttpContext.Response.Body, "ogg",
                    new ConvertSettings()
                    {
                        CustomOutputArgs = " -profile:v baseline -level 3.0 -pix_fmt yuv420p -movflags +faststart "
                    });

                ffMpegTask.OutputDataReceived += (sender, args) => {
                    context.HttpContext.Response.Body.Flush();

                    if (!context.HttpContext.RequestAborted.IsCancellationRequested)
                    {
                        ffMpegTask.Abort();
                        return;
                        //context.HttpContext.Response.Body.Write(("Request aborted by client..."));
                    }
                };

                ffMpegTask.Start();
                ffMpegTask.Wait();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }
    }
}
