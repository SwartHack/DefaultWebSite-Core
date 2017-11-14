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
        public DwsSettings DWSsettings { get; private set; }
        public IHostingEnvironment HostEnv { get; private set; }


        public DwsBaseController(IHostingEnvironment hostenv, IOptions<DwsSettings> settings)
        {
            HostEnv = hostenv;
            DWSsettings = settings.Value;
        }
    }
}
