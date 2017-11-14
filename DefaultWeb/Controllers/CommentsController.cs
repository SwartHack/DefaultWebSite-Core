using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DefaultWeb.Data;
using DefaultWeb.Models.DefaultWebSite.Repositories;
using DefaultWeb.Models.DefaultWebSite.Entities;
using Microsoft.EntityFrameworkCore.Storage;

namespace DefaultWeb.Controllers
{
    /// <summary>
    /// no repository example,
    /// TODO make db action type independent, see adventure works respository...
    /// </summary>
    public class CommentsController : Controller
    {
        private readonly DwsDbContext _context;
        //private readonly IDbContextTransaction _transaction;

        public CommentsController(DwsDbContext context)
        {
            _context = context;
            //_transaction = _context.Database.BeginTransaction();
        }

        /// <summary>
        /// try this for transaction rollback, or try session based....
        /// </summary>
        ~ CommentsController()
        {
            //_transaction.Commit();
            //_transaction.Rollback();
            //_transaction.Dispose();
            _context.Dispose();
        }

        public IActionResult CommentsMain()
        {
            return PartialView();
        }

        
        /// <summary>
        /// Retun list off Sources 
        /// </summary>
        /// <returns></returns>
        public JsonResult GetSources()
        {
            var commentContext = _context.Sources.Include(c => c.Comments);
            Response.StatusCode = 200;
            return Json(commentContext.ToArray());
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IActionResult GetModalContent(string id)
        {  
                string viewname = String.Format("~/Views/Comments/Create{0}.cshtml", id);
                return PartialView(viewname);
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
                TryValidateModel(source);

                if (ModelState.IsValid)
                {
                    using (var context = _context) ///does this matter still
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
                return PartialView("~/Views/_Shared/ServerErorr.cshtml", serverEx);
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
                TryValidateModel(comment);

                if (ModelState.IsValid)
                {
                    using (var context = _context)
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
                return PartialView("~/Views/_Shared/_ServerErorr.cshtml", serverEx);
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
                    var source = _context.Sources.Include(s => s.Comments).First(s => s.Id == sid);

                    if (source != null)
                    {
                        _context.Sources.Remove(source);
                        _context.SaveChanges();
                        Response.StatusCode = 200;
                        return Json(sid);
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
            catch (Exception ex)
            {
                var serverEx = new ServerException() { MiscException = ex };
                Response.StatusCode = 400;
                return PartialView("~/Views/_Shared/_ServerErorr.cshtml", serverEx);
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
                    var comment = _context.Comments.First(c => c.Id == cid);
                    if (comment != null)
                    {
                        _context.Comments.Remove(comment);
                        _context.SaveChanges();
                        Response.StatusCode = 200;
                        return Json(cid);
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
            catch (Exception ex)
            {
                var serverEx = new ServerException() { MiscException = ex };
                Response.StatusCode = 400;
                return PartialView("~/Views/_Shared/_ServerErorr.cshtml", serverEx);
            }
        }

        /// <summary>
        /// /
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool SourceExists(int id)
        {
            return _context.Sources.Any(e => e.Id == id);
        }
    }
}
