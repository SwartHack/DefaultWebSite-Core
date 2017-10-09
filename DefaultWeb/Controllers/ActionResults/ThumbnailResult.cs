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

namespace DefaultWeb.Controllers.ActionResults
{
    public class ThumbnailResult : ActionResult
    {
        public int Width { get; set; }
        public int Height { get; set; }
        public string FileNameFull { get; set; }
        public string MimeType { get; set; }
        public ActionContext Context { get; set; }
        public IHostingEnvironment HostEnv { get; set; }

        public string DwsFile { get; set; }

        public ThumbnailResult(int width, int height, string fileName, string mimeType)
        {
            Width = Width;
            Height = Height;
            FileNameFull = fileName;
            MimeType = mimeType;
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
            Context = context;

            if (string.IsNullOrEmpty(FileNameFull))
                throw new NullReferenceException("File name cannot be null or empty");

            if (!File.Exists(FileNameFull))
            {
                //sub Archive Bot for image thumnail
                FileNameFull = String.Format(@"{0}/8ball32.jpg","~/Images");
            }

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

        /// <summary>
        /// TODO
        /// This should be abstracted out, one ActionResult base clase
        /// </summary>
        private void GetThumbFromFile()
        {
            
            try
            {
                // we need to proceed based on mime type of file
                Image image = null;
                var category = MimeType.Substring(0, ( MimeType.IndexOf(@"/") - 1 ));

                switch (category)
                {
                    case "application":
                        image = GetThumbFromApp(MimeType, FileNameFull);
                        break;

                    case "audio":
                        image = GetThumbForAudio(MimeType, FileNameFull);
                        break;

                    case "video":
                        image = GetThumbFromVideo(MimeType, FileNameFull);
                        break;

                    case "image":
                        image = Image.FromFile(FileNameFull);
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
                }
            }
            catch (Exception ex)
            {
                throw ex;
                //Elmah.ErrorSignal.FromCurrentContext().Raise(e);
            }
        }

        /// <summary>
        /// streaming response...
        /// </summary>
        /// <param name="image"></param>
        private void OutputImageJPEG(Image image)
        {
            //SetCache(Context.HttpContext.Response, 10);

            // set content type
            Context.HttpContext.Response.ContentType = "image/jpeg";
            image.Save(Context.HttpContext.Response.Body, ImageFormat.Jpeg);
        }

        private Image GetThumbFromVideo(string type, string fileAbsolutePath)
        {
            var outThumb = new MemoryStream();

            var ffMpeg = new FFMpegConverter();
            ffMpeg.GetVideoThumbnail(fileAbsolutePath, outThumb, 5);

            return Image.FromStream(outThumb);
        }

        private Image GetThumbForAudio(string type, string fileAbsolutePath)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// pdf only for now
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        private Image GetThumbFromApp(string type, string fileAbsolutePath)
        {
            // parse to see if supported mimetype
            // need a better way to do this!!! TODO
            if (type == "application/pdf")
            {
                try
                {
                    var outThumb = new FileStream(fileAbsolutePath, FileMode.Open, FileAccess.Read);
                    return Image.FromStream(outThumb);
                }
                catch
                {
                    try
                    {
                        return Image.FromFile(Path.Combine(HostEnv.WebRootPath, "Images/pdf-icon.jpg"));
                    }
                    catch
                    {

                        return Image.FromFile(Path.Combine(HostEnv.WebRootPath, "~/content/images/8ball32.jpg"));
                    }
                }

            }
            else {
                return Image.FromFile(Path.Combine(HostEnv.WebRootPath, "~/content/images/8ball32.jpg"));
            }
        }
    }
}
