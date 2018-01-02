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
        public DwsFileInfo DWSFileInfo { get; set; }
        private FFMpegConverter Converter { get; set; }

        public VideoResult(DwsFileInfo fileInfo, FFMpegConverter converter)
        {
            DWSFileInfo = fileInfo;
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

            context.HttpContext.Response.ContentType = "video/ogg";
            //context.HttpContext.Response.Headers.Add("BufferOutput", "false");

            //get the stream from DwsFileTable
            try 
            {
                var ffMpegTask = Converter.ConvertLiveMedia(
                    DWSFileInfo.FileFull,
                    null,
                    context.HttpContext.Response.Body,
                    "ogg",
                    new ConvertSettings()
                    {
                        //AudioSampleRate = 44100,
                        VideoFrameSize = FrameSize.svga800x600
                        //CustomOutputArgs = " -profile:v baseline -level 3.0 -pix_fmt yuv420p -movflags +faststart "
                    });

                ffMpegTask.OutputDataReceived += (sender, args) => {
                    
                    context.HttpContext.Response.Body.Flush();
                    
                    if (context.HttpContext.RequestAborted.IsCancellationRequested)
                    {
                        ffMpegTask.Abort();
                        context.HttpContext.Response.Body.Close();
                        //context.HttpContext.Response.Body.Write(("Request aborted by client..."));
                    }

                    //clean-up ?
                };

                ffMpegTask.Start();

                ffMpegTask.Wait();

            }
            catch (Exception ex)
            {
                var test = ex;
                //ExecuteFallBackRequest(context);
            }
            
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="context"></param>
        private void ExecuteFallBackRequest(ActionContext context)
        {

            try
            {
                //Check the file exist,  it will be written into the response
                if (File.Exists(DWSFileInfo.FileFull))
                {
                    context.HttpContext.Response.Headers.Clear();
                    string headerval = string.Format("attachment; filename={0}", DWSFileInfo.FileName);
                    context.HttpContext.Response.Headers.Add("Content-Disposition", headerval);
                    context.HttpContext.Response.ContentType = DWSFileInfo.MimeType;

                    var file = new FileInfo(DWSFileInfo.FileFull);
                    var stream = file.OpenRead();
                    var buf = new byte[stream.Length];
                    int buflength = stream.Read(buf, 0, (int)file.Length);

                    context.HttpContext.Response.Body.Write(buf, 0, buflength);

                    // clean up?
                }
            }
            catch
            {
                throw;
            }
        }


    }


}
