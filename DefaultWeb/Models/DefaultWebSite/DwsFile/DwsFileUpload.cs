using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DefaultWeb.Models.DefaultWebSite.DwsFile
{
    public class DwsFileUpload
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public ICollection<IFormFile> Files { get; set; }
        public string SessionId { get; set; }
    }
}
