using DefaultWeb.Models.DefaultWebSite.DwsFile;
using ExifLib;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultWeb.Controllers.ActionResults
{
    public class DetailsResult : ActionResult
    {

        public DwsFileInfo DWSFileInfo { get; set; }

        public DetailsResult(DwsFileInfo fileinfo)
        {
            DWSFileInfo = fileinfo;
        }

        public override void ExecuteResult(ActionContext context)
        {

          

        }

    }
}
