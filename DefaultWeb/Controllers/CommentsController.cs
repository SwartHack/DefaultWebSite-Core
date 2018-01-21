using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DefaultWeb.Data;
using DefaultWeb.Models.DefaultWebSite.Repositories;
using DefaultWeb.Models.DefaultWebSite.Entities;
using Microsoft.EntityFrameworkCore.Storage;
using System.Transactions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using DefaultWeb.Models.DefaultWebSite;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace DefaultWeb.Controllers
{
    /// <summary>
    /// no repository example,
    /// TODO make db action type independent, see adventure works respository...
    /// </summary>
    public class CommentsController : Controller
    {
        private DwsDbContext DWSDbContext {get; set; }
       
        public CommentsController(DwsDbContext dbContext)
        {
            DWSDbContext = dbContext;
        }

        public IActionResult CommentsMain()
        {
            return PartialView();
        }
        
        /// <summary>
        /// Retun list of Sources for session, plus Comments for this session only
        /// retaining Sources with no comments!! This took a little patience to figure out.
        /// basically an OUTER LEFT JOIN
        /// </summary>
        /// <returns></returns>
        public IActionResult GetSources()
        {
            var tokens = new List<string>() { "", "" };
            try
            {
                using (var context = DWSDbContext)
                {
                    var sources = context.Sources.Where(s => s.SessionId == Request.Cookies["DwsSessionToken"] || s.SessionId == Request.Cookies["DwsToken"]).OrderBy(ss => ss.Id);

                    var query = sources.Select(source => new
                    {
                        source,
                        comments = source.Comments.Where(c => c.SessionId == Request.Cookies["DwsSessionToken"] || c.SessionId == Request.Cookies["DwsToken"])
                    }).AsEnumerable()
                    .Select(i =>
                    {
                        i.source.Comments = i.comments.ToList();
                        return i.source;
                    });

                    Response.StatusCode = 200;
                    return Json(query.ToList());
                }
            }
            catch (Exception ex)
            {
                var serverEx = new ServerException() { MiscException = ex };
                Response.StatusCode = 400;
                return PartialView("~/Views/Shared/_ServerErorr.cshtml", serverEx);
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IActionResult GetModalContent(string id)
        {
            try
            {
                string viewname = String.Format("~/Views/Comments/Create{0}.cshtml", id);
                return PartialView(viewname);
            }
            catch (Exception ex)
            {
                var serverEx = new ServerException() { MiscException = ex };
                Response.StatusCode = 400;
                return PartialView("~/Views/Shared/_ServerErorr.cshtml", serverEx);
            }
            
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="source"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult CreateSource([Bind("SourceName,Description")] Source source)
        {
            try
            {
                source.SessionId = Request.Cookies["DwsSessionToken"];
                TryValidateModel(source);

                if (ModelState.IsValid)
                {
                    using (var context = DWSDbContext) ///does this matter still
                    {
                        context.Add(source);
                        context.SaveChanges();
                    }
                    Response.StatusCode = 200;
                    return Json(new { Source = source });
                }
                else
                {
                    Response.StatusCode = 201;
                    return PartialView("~/Views/Comments/CreateSource.cshtml", source);
                }
            }
            catch (Exception ex)
            {
                var serverEx = new ServerException() { MiscException = ex };
                Response.StatusCode = 400;
                return PartialView("~/Views/Shared/_ServerErorr.cshtml", serverEx);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="comment"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult CreateComment([Bind("Title,Content,SourceId")] Comment comment)
        {
            try
            {
                comment.SessionId = Request.Cookies["DwsSessionToken"];
                TryValidateModel(comment);

                if (ModelState.IsValid)
                {
                    using (var context = DWSDbContext)
                    {
                        context.Add(comment);
                        context.SaveChanges();
                    }

                    Response.StatusCode = 200;
                    return Json(new { Comment = comment });
                }
                else
                {
                    Response.StatusCode = 201;
                    return PartialView("~/Views/Comments/CreateComment.cshtml", comment);
                }
            }
            catch ( Exception ex  )
            {
                var serverEx = new ServerException() { MiscException = ex };
                Response.StatusCode = 400;
                return PartialView("~/Views/Shared/_ServerErorr.cshtml", serverEx);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteSource(int sid)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var source = DWSDbContext.Sources.Include(s => s.Comments).First(s => s.Id == sid);
                    DWSDbContext.Sources.Remove(source);
                    DWSDbContext.SaveChanges();
                    Response.StatusCode = 200;
                    return Json(sid);
                }
                else
                {
                    throw new DbUpdateException("Model State Invalid!", new Exception("Delete transaction cancelled."));
                }
            }
            catch 
            {
                Response.StatusCode = 200;
                return Json(sid);
            }
        }

        /// <summary>
        /// /
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        public dynamic DeleteComment(int cid)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var comment = DWSDbContext.Comments.First(c => c.Id == cid);
                    DWSDbContext.Comments.Remove(comment);
                    DWSDbContext.SaveChanges();
                    Response.StatusCode = 200;
                    return Json(cid);
                }
                else
                {
                    throw new DbUpdateException("Model State Invalid!", new Exception("Delete transaction cancelled."));
                }
            }
            catch 
            {
                Response.StatusCode = 200;
                return Json(cid);
            }
        }

        /// <summary>
        /// /
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool SourceExists(int id)
        {
            return DWSDbContext.Sources.Any(e => e.Id == id);
        }
    }
}
