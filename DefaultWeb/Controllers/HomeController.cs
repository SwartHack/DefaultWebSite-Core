using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DefaultWeb.Models.DefaultWebSite;
using Microsoft.Extensions.Options;
using System.Web;
using Microsoft.Net.Http.Headers;

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
  
       /// <summary>
       /// 
       /// </summary>
       /// <returns></returns>
        public IActionResult Index(string page)
        {
            if (page != null )
            {
                var path = Request.Path.Value;
                var index = path.IndexOf("/", 1);
                var type =  index == -1 ?  path.Substring(1, path.Length - 1) : path.Substring(1, index - 1);

                switch (type.ToLower())
                {
                    case "home":
                        ViewData["ReturnUrl"] = String.Format("/Home/GetView/{0}", page);
                        ViewData["ReturnTarget"] = "#main-target-area";
                        break;

                    case "notepad":
                        ViewData["ReturnUrl"] = String.Format("/Home/GetNote/{0}", page);
                        ViewData["ReturnTarget"] = "#main-target-area";
                        break;

                    case "sandpit":
                        ViewData["ReturnUrl"] = "/Sandpit/SandpitMain";
                        ViewData["ReturnTarget"] = "#main-target-area";
                        break;

                    case "contact":
                        ViewData["ReturnUrl"] = String.Format("/Home/GetView/{0}", page);
                        ViewData["ReturnTarget"] = "#main-target-area";
                        break;

                    default:

                        break;
                }
            }

            ViewData["BypassBrowser"] = "no";


           if ( Request.QueryString.HasValue )
            {
                ViewData["BypassBrowser"] = "yes";
            }


            ViewData["ThemeName"] = ThemeName;
            ViewData["ThemeDevelopment"] = String.Format("~/lib/_site/dist/css/{0}.css", ThemeName.ToLower());
            ViewData["ThemeProduction"] = String.Format("~/css/defaultwebsite.min.css", ThemeName.ToLower());
           
            return View();
        }

        public IActionResult Error()
        {
            return PartialView();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        public void SetTheme(string name)
        {
            ThemeName = name;
            RedirectToAction("Index");
        }

        public IActionResult GetView(string page)
        {
            return PartialView(String.Format("~/Views/Home/{0}.cshtml", page));
        }

        public IActionResult GetNote(string page)
        {
            var note = String.Format(@"~/Views/Notebook/Notes/{0}.cshtml", page);
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

