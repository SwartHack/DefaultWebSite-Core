using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DefaultWeb.Models;
namespace DefaultWeb.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetView(string viewname)
        {
            return PartialView(viewname);
        }

        public IActionResult GetRundown(string viewname)
        {
            var model = new TargetView { Name = viewname };
            return PartialView("~/Views/Rundowns/Rundown.cshtml", model);
        }

        public IActionResult Talk(string message)
        {
            if (message == "Hello Server")
                return Content("<div title='Server Says...'> Hello...</div>");
            else
                return Content("Huh?");
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
