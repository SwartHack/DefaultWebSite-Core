using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultWeb.Models.DefaultWebSite
{
    public class Comment
    {

        public Comment()
        {
            Datetime = DateTime.Now;
            Author = "Unknown";
        }

        public int Id { get; set; }
        [Required]
        [StringLength(32), MinLength(4)]
        public string Title { get; set; }
        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:MM/dd/yyyy hh:mm tt}")]
        [Display(Name = "Post Date")]
        public DateTime Datetime { get; set; }
        [Required]
        [StringLength(16), MinLength(4)]
        public string Author { set; get; }
        [Required]
        [DataType(DataType.MultilineText)]
        [StringLength(1000), MinLength(10, ErrorMessage = "You can do better than that..."),]
        public string Content { get; set; }

        public int SourceId { get; set; }
        
        public Source Source { get; set; }
    }
}
