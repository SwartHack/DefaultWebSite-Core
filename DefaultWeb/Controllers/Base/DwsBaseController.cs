using DefaultWeb.Models.DefaultWebSite;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultWeb.Controllers.Base
{
    public class DwsBaseController : Controller
    {
        public IOptions<DwsSettings> Settings { get; private set; }
        public IHostingEnvironment HostEnv { get; private set; }

        public DwsBaseController()
        {
           
        }

        //public DwsBaseController(IHostingEnvironment hostEnv, IOptions<DwsSettings> settings)
        //{
        //    Settings = settings.Value;
        //    HostEnv = hostEnv;
        //}

        //TODO
        //Abstract and Interface controllers?
    }
}
