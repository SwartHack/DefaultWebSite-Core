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
using System.Net;
using System.IO;
using Microsoft.AspNetCore.Rewrite;
using static DefaultWeb.RewriteRules;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.StaticFiles;

namespace DefaultWeb
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile("appsettings-dws.json", optional: false, reloadOnChange: true);

            if (env.IsDevelopment())
            {
                builder.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);
                builder.AddJsonFile($"appsettings-dws.{env.EnvironmentName}.json", optional: true);


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

            //////////////////////////////////////////////////////
            // Add Database Context
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            //dws specic configuration 
            services.AddDbContext<DwsDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DwsConnection")));

            //////////////////////////////////////////////////////
            // Add Identity with FrameworkStore and Default Token Provider
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            //////////////////////////////////////////////////////
            // Add Google Athentication
            //services.AddAuthentication().AddGoogle(googleOptions =>
            //{
            //    googleOptions.ClientId = Configuration["Authentication:Google:ClientId"];
            //    googleOptions.ClientSecret = Configuration["Authentication:Google:ClientSecret"];
            //});

            //////////////////////////////////////////////////////
            // Add MVC with Json Serialer options and Session State Temp Data
            // all in one shot
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

            //////////////////////////////////////////////////////
            // Use Distributed Memory Cache and Add Session
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                // Set a short timeout for easy testing.
                //options.IdleTimeout = TimeSpan.FromSeconds(10);
                //options.Cookie.HttpOnly = true;
            });

            //////////////////////////////////////////////////////
            //
            services.AddScoped<IFileRepository, FileRepository>();
            services.AddScoped<ValidateMimeMultipartContentFilter>();

            //////////////////////////////////////////////////////
            //
            services.AddAntiforgery(options =>
            {

            });

            //////////////////////////////////////////////////////
            // Transient provider services
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();

            //////////////////////////////////////////////////////
            // create service for accessing settings
            services.Configure<DwsSettings>(Configuration.GetSection("DefaultWebSiteSettings"));

            //////////////////////////////////////////////////////
            //
            services.Configure<IISOptions>(options =>
            {
                //options.ForwardClientCertificate = false;
            });

            //////////////////////////////////////////////////////
            //
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            //////////////////////////////////////////////////////
            //
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddScoped<IUrlHelper>(factory =>
            {
                var actionContext = factory.GetService<IActionContextAccessor>()
                                           .ActionContext;
                return new UrlHelper(actionContext);
            });

            ////////////////////////////
            /// testing ONLY
            //services.AddDirectoryBrowser();
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        /// <param name="loggerFactory"></param>
        /// <param name="antiforgery"></param>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IApplicationLifetime appLife)
        {
            ////////////////////////////
            ///
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();


            ////////////////////////////
            /// TODO
            /// expand to help us better
            /// 

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                //app.UseDeveloperExceptionPage();
                //app.UseDatabaseErrorPage();
                app.UseExceptionHandler("/Home/Error");
                //app.UseHsts();
            }

            ////////////////////////////
            /// Need to account for opengl non-standard GLSL shader files
            var provider = new FileExtensionContentTypeProvider();
            provider.Mappings.Add(".glsl", "text/plain");
            app.UseStaticFiles(new StaticFileOptions
            {
                ContentTypeProvider = provider
            });
                
            app.UseSession();
            app.UseAuthentication();
            
            ////////////////////////////
            ///
            string sessionid = Guid.NewGuid().ToString();
            string appid = Configuration.GetSection("DefaultWebSiteSettings").GetValue<String>("AdminSessionId");
            app.Use(next => context =>
            {
                string path = context.Request.Path;
                context.Response.Cookies.Append("DwsSessionToken", sessionid, new CookieOptions() { HttpOnly = false });
                context.Response.Cookies.Append("DwsToken", appid, new CookieOptions() { HttpOnly = false });
                return next(context);
            });
            
            ////////////////////////////
            ///
            app.UseMvc(routes =>
            {
                routes.MapRoute("navbar", "Home/{page:regex(^Contact|About|Ack$)}" , new { controller = "Home", action = "Index" });
                routes.MapRoute("notepad", "Notepad/{page:regex(^DefaultWebSite|FrameWorks|WinForms|AspNet|NetCore$)}", new { controller = "Home", action = "Index" });
                routes.MapRoute("sandpit", "Sandpit/", new { controller = "Home", action = "Index", page = "Sandpit" });
                routes.MapRoute("contact", "Contact/", new { controller = "Home", action = "Index", page = "Contact" });

                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{page?}"
                    );
            });

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

            //app.UseStatusCodePages(context => {
            //    var request = context.HttpContext.Request;
            //    var response = context.HttpContext.Response;

            //    if ( request.Path.Value.StartsWith("/Home") )
            //    { 
            //        response.Redirect("/Home/Index");
            //    }

            //});

            //using (StreamReader iisUrlRewriteStreamReader = File.OpenText("IISUrlRewrite.xml"))
            //{
            //    var options = new RewriteOptions()
            //        .AddRedirect("redirect-rule/(.*)", "redirected/$1")
            //        .AddRewrite(@"^rewrite-rule/(\d+)/(\d+)", "rewritten?var1=$1&var2=$2", skipRemainingRules: true)
            //        .AddIISUrlRewrite(iisUrlRewriteStreamReader)
            //        .Add(RewriteRules.RedirectXMLRequests)
            //        .Add(new RedirectImageRequests(".png", "/png-images"))
            //        .Add(new RedirectImageRequests(".jpg", "/jpg-images"));

            //    app.UseRewriter(options);
            //}

        }

    }
}
