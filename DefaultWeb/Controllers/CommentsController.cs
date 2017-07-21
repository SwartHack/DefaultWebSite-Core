using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DefaultWeb.Data;
using DefaultWeb.Models.DefaultWebSite;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Http;

namespace DefaultWeb.Controllers
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
            var sources = from s in _context.Sources
                          select s;
            Response.StatusCode = 200;
            return Json(new { sources = sources.ToArray() });

        }


        // GET: Sources/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var source = await _context.Sources
                .SingleOrDefaultAsync(m => m.Id == id);
            if (source == null)
            {
                return NotFound();
            }

            return PartialView(source);
        }

        public IActionResult GetModalContent(string type, string action)
        {
            if (action == "edit")
            {
                    // need to get instance of element
                    return PartialView();
            }
            else
            {
                string viewname = String.Format("Create{0}.cshtml", type);
                return PartialView(viewname);
            }
            
        }

        // GET: Sources/Create
        //public IActionResult Create()
        //{
        //    return PartialView();
        //}

        // POST: Sources/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult CreateSource([Bind("Id,SourceName,Description")] Source source)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Add(source);
                    _context.SaveChanges();
                    Response.StatusCode = 200;
                    return Json(new { status = "ok", Source = source });
                }
                else
                {
                    Response.StatusCode = 400;
                    return Json(new { error = "Model state returned invalid, transaction cancelled!"});
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                return Json(new { error = e.Message});
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult CreateComment([Bind("Title,Content")] Comment comment, int sourceid)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    comment.SourceId = sourceid;
                    comment.Datetime = DateTime.Now;
                    comment.Author = User.Identity.Name;


                    _context.Add(comment);
                    _context.SaveChanges();
                    Response.StatusCode = 200;
                    return Json(new { status = "ok", Comment = comment });
                }
                else
                {
                    Response.StatusCode = 400;
                    return Json(new { error = "Model state returned invalid, transaction cancelled!" });
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 400;
                return Json(new { error = e.Message });
            }
        }

        //[ValidateAntiForgeryToken]
        //[HttpPost]
        public JsonResult DeleteSource(int id)
        {
            if (ModelState.IsValid) {
                
                    var source = _context.Sources.First(s => s.Id == id);
                    if (source != null)
                    {
                        _context.Sources.Remove(source);
                        _context.SaveChanges();
                        return Json(new { status = "ok", Id = id});
                    }
                    else
                    {
                        Response.StatusCode = 400;
                        return Json(new { error = "Record not found in database?!?"});
                    }
            }
            else
            {
                Response.StatusCode = 400;
                return Json(new { error = "Model state returned invalid, transaction cancelled!" });
            }
        }

        //[ValidateAntiForgeryToken]
        //[HttpPost]
        public JsonResult DeleteComment(int id)
        {
            if (ModelState.IsValid)
            {

                var source = _context.Comments.First(c => c.Id == id);
                if (source != null)
                {
                    _context.Comments.Remove(source);
                    _context.SaveChanges();
                    return Json(new { status = "ok", Id = id });
                }
                else
                {
                    Response.StatusCode = 400;
                    return Json(new { error = "Record not found in database?!?" });
                }
            }
            else
            {
                Response.StatusCode = 400;
                return Json(new { error = "Model state returned invalid, transaction cancelled!" });
            }
        }

        // GET the partial view for editing
        public IActionResult Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var source = _context.Sources.SingleOrDefault(m => m.Id == id);
            if (source == null)
            {
                return NotFound();
            }
            return PartialView(source);
        }

        // POST: Sources/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Save(int id, [Bind("Id,Description")] Source source)
        {
            if (id != source.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(source);
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SourceExists(source.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return PartialView(source);
        }

       

        private bool SourceExists(int id)
        {
            return _context.Sources.Any(e => e.Id == id);
        }
    }
}
