using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using DefaultWeb.Data;
using DefaultWeb.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using DefaultWeb.Models.DefaultWebSite;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using System;
using DefaultWeb.Models.DefaultWebSite.Repositories;
using DefaultWeb.Models.DefaultWebSite.Filters;
using Microsoft.Extensions.Options;

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

        public IConfiguration Configuration { get; }


        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //dws specic configuration 
            services.AddDbContext<DwsDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DwsConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc(options =>
            {
                //options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
                //options.SslPort = 44311;
                //options.Filters.Add(new RequireHttpsAttribute());
            })
            .AddJsonOptions(options =>
             {
                 options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                 options.SerializerSettings.DateFormatString = "MM/dd/yyyy hh:mm tt";
             })
             .AddSessionStateTempDataProvider();

            //services.AddDistributedMemoryCache();
            //services.AddSession(options =>
            //{
            //    // Set a short timeout for easy testing.
            //    options.IdleTimeout = TimeSpan.FromSeconds(10);
            //    //options.Cookie.HttpOnly = true;
            //});

            services.AddScoped<IFileRepository, FileRepository>();
            services.AddScoped<ValidateMimeMultipartContentFilter>();

            services.AddAntiforgery(options =>
            {

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

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        /// <param name="loggerFactory"></param>
        /// <param name="antiforgery"></param>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            //app.UseSession();
            app.UseAuthentication();



            //app.Use(next => context =>
            //{
            //    string path = context.Request.Path.Value;
            //    if (string.Equals(path, "/", StringComparison.OrdinalIgnoreCase) || string.Equals(path, "/index.html", StringComparison.OrdinalIgnoreCase))
            //    {
            //        //We can send the request token as a JavaScript - readable cookie, 
            //         //and JQuery  will use it by default.
            //antiforgery.GetAndStoreTokens(context);
            //        context.Response.Cookies.Append("RequestVerificationToken", tokens.RequestToken, new CookieOptions() { HttpOnly = false });
            //    }

            //return next(context);
            //});

            string guid = Guid.NewGuid().ToString();
            app.Use(next => context =>
            {
                string path = context.Request.Path;
                context.Response.Cookies.Append("DwsSessionToken",guid , new CookieOptions() { HttpOnly = false });
                return next(context);

            });


            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
