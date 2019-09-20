using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PartnerScraper.Models
{
    public class PartnerScraperContext : DbContext
    {
        public DbSet<Partner> Partners { get; set; }
        public DbSet<Scrape> Scrapes { get; set; }
        public DbSet<Scan> Scans { get; set; }
        public DbSet<ScrapePartner> ScrapePartners { get; set; }

        #region Constructors
        public PartnerScraperContext(DbContextOptions options)
            : base(options)
        { } //PartnerScraperContext(DbContextOptions)
        #endregion
    }   // PartnerScraperContext
}
