using System;
using System.Collections.Generic;

namespace DefaultWeb.Models.DefaultWebSite.File
{
    public class UploadResult
    {
        public List<string> FileNames { get; set; }
        public string Description { get; set; }
        public DateTime CreatedTimestamp { get; set; }
        public DateTime UpdatedTimestamp { get; set; }
        public List<string> ContentTypes { get; set; }
    }
}
