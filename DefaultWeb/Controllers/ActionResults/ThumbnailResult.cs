using Microsoft.AspNetCore.Mvc;
using System;
using System.Drawing;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Drawing.Imaging;
using NReco.VideoConverter;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using DefaultWeb.Models.DefaultWebSite.DwsFile;

namespace DefaultWeb.Controllers.ActionResults
{
    public class ThumbnailResult : ActionResult
    {
        public int Width { get; set; }
        public int Height { get; set; }
        public DwsFileInfo FileInfo { get; set; }
        public ActionContext Context { get; set; }
        public IHostingEnvironment HostEnv { get; set; }
        private FFMpegConverter Converter { get; set; }

        public string DwsFile { get; set; }

        public ThumbnailResult(int width, int height, DwsFileInfo fileInfo, IHostingEnvironment env, FFMpegConverter converter)
        {
            Width = width;
            Height = height;
            FileInfo = fileInfo;
            HostEnv = env;
            Converter = converter;
            
        }

        //private void SetCache(HttpResponseBase response, int days)
        //{
        //    response.Cache.SetCacheability(HttpCacheability.Public);
        //    response.Cache.SetExpires(Cache.NoAbsoluteExpiration);
        //    response.Cache.SetLastModifiedFromFileDependencies();

        //    DateTime dt = DateTime.Now.AddDays(days);
        //    response.Cache.SetMaxAge(new TimeSpan(dt.ToFileTime()));
        //    response.Cache.SetExpires(dt);
        //}

        public override void ExecuteResult(ActionContext context)
        {
            try
            {
                Context = context;
                
                // this is on the server!!!!
                //bool hasCache = !string.IsNullOrWhiteSpace(CacheFilePath) && File.Exists(CacheFilePath);
                //if (hasCache)
                //{
                //    using (Image image = Image.FromFile(CacheFilePath))
                //    {
                //        OutputImageJPEG(image);
                //        return;
                //    }
                //}

               GetThumbFromFile();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            
            
        }

        /// <summary>
        /// TODO
        /// This should be abstracted out, one ActionResult base clase
        /// </summary>
        private void GetThumbFromFile()
        {
            if (!File.Exists(FileInfo.FileFull))
            {
                //sub Archive Bot for image thumnail
                FileInfo.FileFull = String.Format(@"{0}/8ball32.jpg", "~/Images");
            }
            try
            {
                // we need to proceed based on mime type of file
                Image image = null;
                var index = FileInfo.ContentType.IndexOf(@"/");
                var category =  FileInfo.ContentType.Substring(0, (index));
                var type = FileInfo.ContentType.Substring(index + 1);
                //TODO, only process accepted files, but should be filtered before this
                // Upload should only allowed accepted file types
                FileStream fStream = null;

                switch (category)
                {
                    case "application":
                        image = GetThumbFromApp(FileInfo);
                        break;

                    case "audio":
                        image = GetThumbForAudio(FileInfo);
                        break;

                    case "video":
                        image = GetThumbFromVideo(FileInfo);
                        break;

                    case "image":
                        fStream = File.Open(FileInfo.FileFull,FileMode.Open);
                        image = Image.FromStream(fStream);
                        //stream.Close();
                        //stream.Dispose();
                        //image = Image.FromFile(FileInfo.FileFull);
                        break;


                    default:
                        image = null;  // some default image, 8-ball
                        break;
                }

                // generate thumbnail
                if (image != null)
                {
                    Image thumb = image.GetThumbnailImage(Width, Height, () => false, IntPtr.Zero);

                    //// save cache
                    //if (!string.IsNullOrWhiteSpace(CacheFilePath))
                    //    thumb.Save(CacheFilePath);

                    OutputImageJPEG(thumb);
                    thumb.Dispose();

                    if (fStream != null)
                    {
                        fStream.Dispose();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// streaming response...
        /// </summary>
        /// <param name="image"></param>
        private void OutputImageJPEG(Image image)
        {
            try
            {
                //SetCache(Context.HttpContext.Response, 10);

                // set content type
                Context.HttpContext.Response.ContentType = "image/jpeg";
                image.Save(Context.HttpContext.Response.Body, ImageFormat.Jpeg);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private Image GetThumbFromVideo(DwsFileInfo fileInfo)
        {
            try
            {

                var outThumb = new MemoryStream();
                Converter.GetVideoThumbnail(fileInfo.FileFull, outThumb, 5);
                return Image.FromStream(outThumb);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        private Image GetThumbForAudio(DwsFileInfo fileInfoh)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// pdf only for now
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        private Image GetThumbFromApp(DwsFileInfo fileInfo)
        {
            // parse to see if supported mimetype
            // need a better way to do this!!! TODO
            // TODO - how to get a PDF thumbnail on server!?
            if (fileInfo.ContentType == "application/pdf")
            {
                try
                {
                    var file = String.Format("{0}{1}", HostEnv.WebRootPath, @"\images\pdf-icon.jpg");
                    return Image.FromFile(file);
                }
                catch
                {

                    return Image.FromFile(Path.Combine(HostEnv.WebRootPath, @"\images\8ball32.jpg"));
                }
            }
            else {
                return Image.FromFile(Path.Combine(HostEnv.ContentRootPath, @"\images\8ball32.jpg"));
            }
        }
    }
}
