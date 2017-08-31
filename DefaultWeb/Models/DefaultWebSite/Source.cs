using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DefaultWeb.Models.DefaultWebSite
{
    public class Source
    {
        public int Id { get; set; }
        [Required]
        //[RegularExpression(@"^[a-zA-Z''-'\s]{4,16}$")]
        [StringLength(16), MinLength(4)]
        public string SourceName { get; set;  }
        [Required]
        [DataType(DataType.MultilineText)]
        //[RegularExpression(@"^[a-zA-Z''-'\s]{4,32}$")]
        [StringLength(32), MinLength(4)]
        public string Description { get; set; }

       public List<Comment> Comments { get; set; }
    }
}
