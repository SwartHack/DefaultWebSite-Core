using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultWeb2.Models
{
    public class DwsSettings
    {
        public string Title { get; set; }
        public string ArchivePhysicalPath { get; set; }
        public bool UseHardCacheInDisk { get; set; }
        public string CacheFolderPhysicalPath { get; set; }
        public string FolderContentFileName { get; set; }
        public string DefaultTheme { get; set; }
        public string[] ValidFileExtensions { get; set; }
        public string[] IgnoreFolders { get; set; }
        public bool HidePrivateFolders { get; set; }
        public string[] AdminEmails { get; set; }
        public bool AdminEnable { get; set; }
        public string ImagesSortCriteria { get; set; }
        public string FoldersSortCriteria { get; set; }
        public string AnalyticsCode { get; set; }
        public NotifyOptions Notifications { get; set; }

    }

    public class NotifyOptions
    {
        public bool Enabled { get; set; }
        public string EmailFrom { get; set; }
        public string SmtpRelay { get; set; }
        public int SmtpPort { get; set; }
        public string NotifyEmail { get; set; }
    }
}
