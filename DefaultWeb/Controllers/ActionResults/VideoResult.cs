using DefaultWeb.Models.DefaultWebSite.File;
using Microsoft.AspNetCore.Mvc;
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

        public VideoResult(string fileFullName, string mimeType)
        {
            FileNameFull = fileFullName;
            MimeType = mimeType;
        }

        public override void ExecuteResult(ActionContext context)
        {
            //string headerval = string.Format("attachment; filename={0}", DwsFile);
            //context.HttpContext.Response.Headers.Add("Content-Disposition", headerval);
            context.HttpContext.Response.Headers.Add("Content-Type", "video/ogg");

            var converter = new FFMpegConverter();

            //get the stream from DwsFileTable

            var ffMpegTask = converter.ConvertLiveMedia(
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


            //converter.ConvertMedia(DwsFile.FileName, null, "output.mp4", null, new ConvertSettings()
            //{
            //    CustomOutputArgs = " -profile:v baseline -level 3.0 -pix_fmt yuv420p -movflags +faststart "
            //});



        }
    }
}
