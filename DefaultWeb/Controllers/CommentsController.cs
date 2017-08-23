using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DefaultWeb2.Data;
using DefaultWeb2.Models.DefaultWebSite;

namespace DefaultWeb2.Controllers
{
    public class CommentsController : Controller
    {
        private readonly DwsDbContext _context;

        public CommentsController(DwsDbContext context)
        {
            _context = context;    
        }

        public IActionResult Main()
        {
            return PartialView();
        }

        // GET: Sources
        public JsonResult GetSources()
        {
            var commentContext = _context.Sources.Include(c => c.Comments);
            Response.StatusCode = 200;
            return Json(commentContext.ToArray());
                
        }

        public IActionResult GetModalContent(string id)
        {  
                string viewname = String.Format("~/Views/Comments/Create{0}.cshtml", id);
                return PartialView(viewname);
        }

        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public dynamic CreateSource([FromForm] Source source)
        {
            try
            {
                TryValidateModel(source);

                if (ModelState.IsValid)
                {
                    _context.Add(source);
                    _context.SaveChanges();
                    Response.StatusCode = 200;
                    return Json(new { Source = source });
                }
                else
                {
                    Response.StatusCode = 201;
                    return PartialView("~/Views/Comments/CreateSource.cshtml", source);
                }
            }
            catch (DbUpdateException dbx)
            {
                var serverError = new ServerError() { DbException = dbx };
                Response.StatusCode = 400;
                return PartialView("~/Views/_Shared/ServerErorr.cshtml", serverError);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public dynamic CreateComment([FromForm] Comment comment)
        {
            
            try
            {
                TryValidateModel(comment);

                if (ModelState.IsValid)
                {
                    
                    _context.Add(comment);
                    _context.SaveChanges();
                    Response.StatusCode = 200;
                    return Json(new { Comment = comment });
                }
                else
                {
                    Response.StatusCode = 201;
                    return PartialView("~/Views/Comments/CreateComment.cshtml", comment);
                }
            }
            catch (DbUpdateException dbx)
            {
                var serverError = new ServerError() { DbException = dbx };
                Response.StatusCode = 400;
                return PartialView("~/Views/_Shared/ServerErorr.cshtml", serverError);
            }
        }

        //[ValidateAntiForgeryToken]
        //[HttpPost]
        public dynamic DeleteSource(int id)
        {
            try
            {
                if (ModelState.IsValid)
                {

                    var source = _context.Sources.Include(s => s.Comments).First(s => s.Id == id);
                  
                    if (source != null)
                    {
                        _context.Sources.Remove(source);
                        _context.SaveChanges();
                        Response.StatusCode = 200;
                        return Json(id);
                    }
                    else
                    {
                        throw new DbUpdateException("Record not found!", new Exception("Unable to delete source."));
                    }
                }
                else
                {
                    throw new DbUpdateException("Model State Invalid!", new Exception("Delete transaction cancelled."));
                }
            }
            catch (DbUpdateException dbx)
            {
                var serverError = new ServerError() { DbException = dbx };
                Response.StatusCode = 400;
                return PartialView("~/Views/_Shared/ServerErorr.cshtml", serverError);
            }

            
        }

        //[ValidateAntiForgeryToken]
        //[HttpPost]
        public dynamic DeleteComment(int id)
        {
            
            try
            {
                if (ModelState.IsValid)
                {

                    var comment = _context.Comments.First(c => c.Id == id);
                    if (comment != null)
                    {
                        _context.Comments.Remove(comment);
                        _context.SaveChanges();
                        Response.StatusCode = 200;
                        return Json(comment);
                    }
                    else
                    {
                        throw new DbUpdateException("Record not found!", new Exception("Unable to delete source."));
                    }
                }
                else
                {
                    throw new DbUpdateException("Model State Invalid!", new Exception("Delete transaction cancelled."));
                }
            }
            catch (DbUpdateException dbx)
            {
                var serverError = new ServerError() { DbException = dbx };
                Response.StatusCode = 400;
                return PartialView("~/Views/_Shared/ServerErorr.cshtml", serverError);
            }

        }

        // GET: Sources/Details/5
        public  IActionResult Details(int id)
        {
           

            var source = _context.Sources.Single(m => m.Id == id);
            if (source == null)
            {
                return NotFound();
            }

            return PartialView(source);
        }


        private bool SourceExists(int id)
        {
            return _context.Sources.Any(e => e.Id == id);
        }
    }
}
