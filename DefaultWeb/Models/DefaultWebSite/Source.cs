using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DefaultWeb.Models.DefaultWebSite
{
    public class Source
    {
        public int Id { get; set; }
        [Required]
        public string SourceName { get; set;  }
        [Required]
        public string Description { get; set; }

       public List<Comment> Comments { get; set; }
    }
}
