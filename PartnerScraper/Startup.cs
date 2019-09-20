using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using PartnerScraper.Config;
using PartnerScraper.Factories;
using PartnerScraper.Models;
using PartnerScraper.Services;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace PartnerScraper
{
    public class Startup
    {
        #region Public Properties
        public IConfiguration Configuration { get; private set; }   // Configuration
        public IHostingEnvironment HostingEnvironment { get; private set; } // HostingEnvironment
        #endregion

        #region .ctor
        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            // configure settings
            SetupConfigValues(configuration, environment);

            HostingEnvironment = environment;
        }   // .ctor
        #endregion

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            IConfigurationSection connectionString = Configuration.GetSection("ConnectionStrings:DefaultConnection");

            services.Configure<ReactSettings>(Configuration.GetSection("ReactSettings"));

            services.Configure<ConnectionStrings>(connectionString);
            // this binds the partner settings object to the dependency injection service
            services.Configure<PartnerSettings>(Configuration.GetSection("PartnerSettings"));

            // AddSingletons - Singleton objects are the same for every object and every request
            services.AddSingleton<HtmlHelper>();
            services.Configure<PartnerScraperContextFactory>(connectionString);
            services.AddScoped<IScanService, ScanService>();
            services.AddSingleton<ScrapeService>();
            services.AddSingleton<ScraperFactory>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            // Add httpContext and IHttpClientFactory
            services.AddHttpContextAccessor();
            services.AddHttpClient();
            // Add SQLite Context
            services.AddDbContext<PartnerScraperContext>(options => options.UseSqlite(connectionString.Value));
        }   // ConfigureServices(IServiceCollection)

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IServiceProvider serviceProvider)
        {
            // Configure logging.
            loggerFactory.AddLog4Net($"log4net.{env.EnvironmentName}.config");

            if (Boolean.Parse(Configuration["ReactSettings:HotReloading"]))
            {
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    ProjectPath = Directory.GetCurrentDirectory(),
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
                app.UseDeveloperExceptionPage();
            }   // if
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }   // else

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }   // Configure(IApplicationBuilder, IHostingEnvironment, ILoggerFactory, IServiceProvider)

        #region Private Methods
        private void SetupConfigValues(IConfiguration config, IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
            .SetBasePath(env.ContentRootPath)
            .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: false, reloadOnChange: true);

            builder.AddEnvironmentVariables();

            Configuration = builder.Build();
        }   // SetupConfigValues(IConfiguration, IHostingEnvironment)
        #endregion
    }   // Startup
}
