using System;
using Microsoft.AspNetCore.Mvc;

namespace DefaultWeb.Controllers
{
    public class SandboxController : Controller
    {


        public IActionResult SandboxMain()
        {
            return PartialView();
        }

        public IActionResult SandboxDocs()
        {
            return PartialView();
        }

        public IActionResult GetView(string id)
        {
                return PartialView(String.Format("~/Views/Sandbox/{0}.cshtml", id));
        }

        public IActionResult UnderConstruction (string id)
        {
            return PartialView("~/Views/Shared/_UnderCons.cshtml");
        }

    }


}