using DefaultWeb.Models.DefaultWebSite.File;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultWeb.Controllers.ActionResults
{
    public class ImageResult : ActionResult
    {
        
        public DwsFileInfo DwsFile { get; set; }

        public ImageResult(DwsFileInfo fileInfo)
        {
            DwsFile = fileInfo;
        }

        public override void ExecuteResult(ActionContext context)
        {

            //just stream the file???
            // or will we need to convert...

            //return File(DwsFile.FileName, DwsFile.ContentType);



        }
    }
}
