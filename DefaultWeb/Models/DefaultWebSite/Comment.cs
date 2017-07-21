using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultWeb.Models.DefaultWebSite
{
    public class Comment
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public DateTime Datetime { get; set; }
        [Required]
        public string Author { set; get; }
        [Required]
        public string Content { get; set; }

        public int SourceId { get; set; }
        public Source Source { get; set; }
    }
}
