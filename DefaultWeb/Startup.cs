using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using DefaultWeb.Data;
using DefaultWeb.Models;
using DefaultWeb.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace DefaultWeb
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddJsonFile("appsettings-dws.json", optional: false, reloadOnChange: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see https://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets<Startup>();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            //default project users/identity LocalDb?
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //dws data LocalDb
            services.AddDbContext<DwsDbContext>(options => 
                options.UseSqlServer(Configuration.GetConnectionString("DwsConnection")));

            //AdWorks data Local Db, and others...
            
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            services.AddAuthentication();

            

            services.AddMvc(options =>
            {
                //options.SslPort = 44311;
                //options.Filters.Add(new RequireHttpsAttribute());
            })
            .AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                options.SerializerSettings.DateFormatString = "MM/dd/yyyy hh:mm tt";
            });
            


            // Add other provider services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();

            // create service for accessing settings
            services.Configure<DwsSettings>(Configuration.GetSection("DefaultWebSiteSettings"));

            services.Configure<IISOptions>(options =>
            {

            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            //var options = new RewriteOptions()
            //.AddRedirectToHttps();
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            // .Net Core 1.1
            // app.UseIdentity();
            /// https://docs.microsoft.com/en-us/aspnet/core/migration/1x-to-2x/identity-2x
            /// .Net Core 2.0 Identity changes
            /// 
            app.UseAuthentication();

            // Add external authentication middleware below. To configure them please see https://go.microsoft.com/fwlink/?LinkID=532715

            app.UseMvc(routes =>
            {
                //routes.MapRoute(
                //    name: "GetView",
                //    template: "{controller=Home}/{action=GetView}/{id?}"
                //    );

                //routes.MapRoute(
                //    name: "GetRundown",
                //    template: "{controller=Home}/{action=GetRundown}/{id?}"
                //    );

                routes.MapRoute( name: "default", template: "{controller=Home}/{action=Index}/{id?}");
               

            });
        }
    }
}
