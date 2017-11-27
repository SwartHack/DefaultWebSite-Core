using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DefaultWeb.Models.DefaultWebSite;
using Microsoft.Extensions.Options;
using System.Web;

namespace DefaultWeb.Controllers
{
    public class HomeController : Controller
    {
        public DwsSettings _settings { get; private set; }
        private string ThemeName { get; set; }

        public HomeController(IOptions<DwsSettings> settingsOptions)
        {
            _settings = settingsOptions.Value;
            // let's check the theme set-up here instead of View

            //get default from config
            if ( String.IsNullOrEmpty(_settings.DefaultTheme) )
            {
                ThemeName = "default";
            }
            else
            {
                var bstheme = _settings.DefaultTheme;
                ThemeName = bstheme;
               
            }
        }
  
       
        public IActionResult Index()
        {
            ViewData["ThemeName"] = ThemeName;
            ViewData["ThemeDevelopment"] = String.Format("lib/_site/dist/css/{0}.css", ThemeName.ToLower());
            ViewData["ThemeProduction"] = String.Format("css/{0}.min.css", ThemeName.ToLower());

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        public void SetTheme(string name)
        {
            ThemeName = name;
            RedirectToAction("Index");
        }

        public IActionResult GetView(string id)
        {
            return PartialView(String.Format("~/Views/Home/{0}.cshtml", id));
        }

        public IActionResult GetNote(string id)
        {
            var note = String.Format(@"~/Views/Notebook/Notes/{0}.cshtml", id);
            return PartialView(note);
        }


        public IActionResult Talk(string message)
        {
            if (message == "Hello Server")
                return Content("<div title='Server Says...'> Hello...</div>");
            else
                return Content("Huh?");
        }

    }
}

