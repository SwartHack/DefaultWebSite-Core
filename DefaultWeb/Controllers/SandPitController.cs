using System;
using Microsoft.AspNetCore.Mvc;

namespace DefaultWeb.Controllers
{
    public class SandpitController : Controller
    {


        public IActionResult SandpitMain(string page)
        {
            //if (page != null)
            //{
            //    var path = Request.Path.Value;
            //    var type = path.Substring(1, path.IndexOf("/", 1) - 1);
              
            //    ViewData["ReturnUrl"] = String.Format("/Sandpit/GetView/{0}", page);
            //    ViewData["ReturnTarget"] = "#sandpit-target-area";
            //    return View("")
            //}



            return PartialView();
        }

        public IActionResult SandpitDocs()
        {
            return PartialView();
        }

        public IActionResult GetView(string page)
        {
                return PartialView(String.Format("~/Views/Sandpit/{0}.cshtml", page));
        }

        public IActionResult UnderConstruction (string page)
        {
            return PartialView("~/Views/Shared/_UnderCons.cshtml");
        }

    }


}