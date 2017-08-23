using System;
using Microsoft.AspNetCore.Mvc;

namespace DefaultWeb2.Controllers
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