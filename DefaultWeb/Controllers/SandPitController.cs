using System;
using Microsoft.AspNetCore.Mvc;

namespace DefaultWeb.Controllers
{
    public class SandPitController : Controller
    {


        public IActionResult SandPitMain()
        {
            return PartialView();
        }

        public IActionResult SandpitDocs()
        {
            return PartialView();
        }

        public IActionResult GetView(string id)
        {
                return PartialView(String.Format("~/Views/Sandpit/{0}.cshtml", id));
        }

        public IActionResult UnderConstruction (string id)
        {
            return PartialView("~/Views/Shared/_UnderCons.cshtml");
        }

    }


}