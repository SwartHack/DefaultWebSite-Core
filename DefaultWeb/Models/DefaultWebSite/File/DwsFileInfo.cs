using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultWeb.Models.DefaultWebSite.File
{
    public class DwsFileInfo
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FriendlyName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedTimestamp { get; set; }
        public DateTime UpdatedTimestamp { get; set; }
        public string ContentType { get; set; }
        public long FileSize { get; set; }

        [NotMapped]
        public string FileUrl { get; set; }
        [NotMapped]
        public string ThumbnailUrl { get; set; }
        //public Dictionary<string, object> ExifInfo { get; set; }
    }
}
