using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DefaultWeb.Models.DefaultWebSite.File
{
    public class AllUploadedFiles
    {
        public List<DwsFileUpload> AllFiles { get; set; }
    }

    public class DwsFileUpload
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public ICollection<IFormFile> Files { get; set; }
    }
}
