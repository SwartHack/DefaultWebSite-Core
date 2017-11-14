using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultWeb.Models.DefaultWebSite.DwsFile
{

    public class DwsFileInfo
    {
        public int Id { get; set; }
        public string FileName { get; private set; }
        [JsonIgnore]
        public string FilePath { get; private set; }
        [JsonIgnore]
        public string FileFull { get; set; }
        public string FriendlyName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedTimestamp { get; set; }
        public DateTime UpdatedTimestamp { get; set; }
        public string ContentType { get; set; }
        public long FileSize { get; set; }
        [JsonIgnore]
        public string SessionId { get; set; }

        [NotMapped]
        public string FileApi { get; set; }
        [NotMapped]
        public string FileTarget { get; set; }
        [NotMapped]
        public string ThumbnailUrl { get; set; }

        public DwsFileInfo()
        {

        }

        ~DwsFileInfo()
        {

        }

        public DwsFileInfo(string fileName, string filePath)
        {
            FileName = fileName;
            FilePath = String.Format(@"{0}", filePath); 
            FileFull = String.Format(@"{0}\{1}", FilePath, FileName);
            FriendlyName = fileName;
        }
    }
}
