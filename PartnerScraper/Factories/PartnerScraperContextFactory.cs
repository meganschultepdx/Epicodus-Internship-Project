using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using PartnerScraper.Models;

namespace PartnerScraper.Factories
{
    public class PartnerScraperContextFactory : IDesignTimeDbContextFactory<PartnerScraperContext>
    {
        public PartnerScraperContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<PartnerScraperContext>();
            builder.UseSqlite("Data Source=partner_scraper.db");
            return new PartnerScraperContext(builder.Options);
        }   // CreateDbContext(string[])
    }   // PartnerScraperContextFactory
}