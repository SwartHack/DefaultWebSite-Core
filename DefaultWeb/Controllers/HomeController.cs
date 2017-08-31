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
        private string BootStrapThemeName { get; set; }
        private string JqueryUiThemeName { get; set; }

        public HomeController(IOptions<DwsSettings> settingsOptions)
        {
            _settings = settingsOptions.Value;
            // let's check the theme set-up here instead of View

            //get default from config
            if (String.IsNullOrEmpty(_settings.DefaultBootstrapTheme) || String.IsNullOrEmpty(_settings.DefaultJqueryUiTheme) )
            {
                BootStrapThemeName = "DefautBootstrapTheme";
                JqueryUiThemeName = "vader";


            }
            else
            {
                var bstheme = _settings.DefaultBootstrapTheme;
                var jquitheme = _settings.DefaultJqueryUiTheme;
                BootStrapThemeName = bstheme;
                JqueryUiThemeName = jquitheme;
            }
        }
  
       

        public IActionResult Index()
        {
            ViewData["BootstrapThemeName"] = BootStrapThemeName;
            ViewData["BootstrapThemeDevelopment"] = String.Format("lib/_site/dist/css/themes/{0}.css", BootStrapThemeName.ToLower());
            ViewData["BootstrapThemeProduction"] = String.Format("css/themes/{0}.min.css", BootStrapThemeName.ToLower());

            ViewData["JqueryUiThemeName"] = JqueryUiThemeName;
            ViewData["JqueryUiThemeDevelopment"] = String.Format("lib/jquery-ui/themes/{0}/jquery-ui.css", JqueryUiThemeName.ToLower());
            ViewData["JqueryUiThemeProduction"] = String.Format("css/jquery-ui/{0}/jquery-ui.min.css", JqueryUiThemeName.ToLower());

            return View();
        }

        public void SetTheme(string theme)
        {
            BootStrapThemeName = theme;
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

