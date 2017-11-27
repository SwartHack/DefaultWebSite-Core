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
        [StringLength(50, MinimumLength = 4)]
        public string Title { get; set; }
        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        [Display(Name = "Post Date")]
        public DateTime Datetime { get; set; }
        [Required]
        public string Author { set; get; }
        [Required]
        [DataType(DataType.MultilineText)]
        [StringLength(1000, MinimumLength = 10)]
        public string Content { get; set; }

        public int SourceId { get; set; }
        
        public Source Source { get; set; }
    }
}
