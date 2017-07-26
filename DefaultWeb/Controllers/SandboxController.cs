using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DefaultWeb.Models;

namespace DefaultWeb.Controllers
{
    public class SandboxController : Controller
    {


        public IActionResult Main()
        {
            return PartialView();
        }

        public IActionResult About()
        {
            return PartialView();
        }

        public IActionResult GetView(string id)
        {

            if ( id == "Sources")
                return PartialView(String.Format("~/Views/Sources/Index.cshtml", "Index"));
            else
                return PartialView(String.Format("~/Views/Sandbox/{0}.cshtml", id));
        }

        public IActionResult UnderConstruction (string id)
        {
            return PartialView("~/Views/Shared/_UnderCons.cshtml");
        }

    }


}