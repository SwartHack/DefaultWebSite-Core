using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DefaultWeb.Models;
using Microsoft.Extensions.Options;
using System.Web;

namespace DefaultWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly DwsSettings _settings;
        private string ThemeName { get; set; }

        public HomeController(IOptions<DwsSettings> settingsOptions)
        {
            _settings = settingsOptions.Value;

            // let's check the theme set-up here instead of View

            //get default from config
            if (String.IsNullOrEmpty(_settings.DefaultTheme))
            {
                ThemeName = "Default";
     
            }
            else
            {
                var theme = _settings.DefaultTheme;
                ThemeName = theme;
            }
        }
  
       

        public IActionResult Index()
        {
            ViewData["ThemeName"] = ThemeName;
            ViewData["ThemeDevelopment"] = String.Format("~/css/themes/{0}.css", ThemeName.ToLower());
            ViewData["ThemeProduction"] = String.Format("~/css/themes/{0}.min.css", ThemeName.ToLower());

            return View();
        }

        public void SetTheme(string theme)
        {
            ThemeName = theme;
            Redirect("Index");
        }

        public IActionResult GetView(string id)
        {
            return PartialView(String.Format("~/Views/Home/{0}.cshtml", id));
        }

        public IActionResult GetRundown(string id)
        {
            var model = new TargetView { Name = id + ".cshtml"};
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

