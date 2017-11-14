using DefaultWeb.Controllers.Base;
using DefaultWeb.Models.DefaultWebSite;
using DefaultWeb.Models.DefaultWebSite.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DefaultWeb.Controllers
{
    public class GISController: DwsBaseController
    {
        private IFileRepository FileRepository { get; set; }


        public GISController(IFileRepository fileRepository, IHostingEnvironment env, IOptions<DwsSettings> settings, IConfiguration config) : base(env, settings)
        {
            FileRepository = fileRepository;
            //FileRepository.BeginTransaction();
        }

        ~GISController()
        {
            //FileRepository.CommitTransaction();
        }




    }
}
