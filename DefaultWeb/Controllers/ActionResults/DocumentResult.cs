using DefaultWeb.Models.DefaultWebSite.DwsFile;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultWeb.Controllers.ActionResults
{
    public class DocumentResult : ActionResult
    {
        public string FileNameFull { get; set; }
        public string MimeType { get; set; }

        public DocumentResult(string fileFullName, string mimeType)
        {
            FileNameFull = fileFullName;
            MimeType = mimeType;
        }

        public override void ExecuteResult(ActionContext context)
        {

        }

    }
}
