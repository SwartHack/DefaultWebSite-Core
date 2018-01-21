using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DefaultWeb.Controllers
{
    public class ArcGisController : Controller
    {
        public IActionResult ArcGisMain()
        {
            return PartialView();
        }


    }
}