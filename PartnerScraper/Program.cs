using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using PartnerScraper.Models;
using System;

namespace PartnerScraper
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }   // Main(string[])

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();	// CreateWebHostBuilder(string[])

    }	// Program
}
