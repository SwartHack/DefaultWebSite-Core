using ExifLib;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultWeb.Models.DefaultWebSite.DwsFile
{
    public static class DwsImageExif
    {

        public static Dictionary<string, object> GetExifDetails(string filefull)
        {
            Dictionary<string, object> info = new Dictionary<string, object>();
            try
            {
                using (ExifReader reader = new ExifReader(filefull))
                {
                    ExtractTag<string>(reader, info, ExifTags.Make);
                    ExtractTag<string>(reader, info, ExifTags.Model);
                    ExtractTag<double>(reader, info, ExifTags.ApertureValue);
                    ExtractTag<UInt16>(reader, info, ExifTags.Flash);
                    ExtractTag<UInt16>(reader, info, ExifTags.WhiteBalance);
                    ExtractTag<DateTime>(reader, info, ExifTags.DateTimeDigitized);
                    ExtractTag<string>(reader, info, ExifTags.PhotographicSensitivity);
                    ExtractTag<double>(reader, info, ExifTags.FocalLength);
                    ExtractTag<double>(reader, info, ExifTags.ExposureTime);
                }
            }
            catch (Exception)
            {
                return null;
            }
            return info;
        }

        private static void ExtractTag<T>(ExifReader reader, Dictionary<string, object> info, ExifTags tag)
        {
            T tagVal;
            if (reader.GetTagValue<T>(tag, out tagVal))
            {
                info.Add(tag.ToString(), tagVal.ToString());
            }
        }

        public static string GetExifDescription(string filefull)
        {
            string descr = null;
            try
            {
                using (ExifReader reader = new ExifReader(filefull))
                {
                    reader.GetTagValue<string>(ExifTags.ImageDescription, out descr);
                }
            }
            catch (Exception)
            {
                return String.Empty;
            }
            return descr;
        }

    }
}
