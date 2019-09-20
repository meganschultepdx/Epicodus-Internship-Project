using System;
using System.Collections.Generic;

namespace PartnerScraper.Models
{
    public class Scan
    {
        // private ScrapeService _ScrapeService;
        public Guid Id { get; set; }
        public string UPC { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public List<Scrape> Scrapes { get; set; }

        #region Constructors
        public Scan(string upc)
        {
            UPC = upc;
            Id = Guid.NewGuid();
            CreatedDate = DateTime.Now;
            ModifiedDate = DateTime.Now;
        } // Scan(string)

        // Empty constructor is only here to make Entity happy
        public Scan()
        { } // Scan()
        #endregion
    } // Scan
}
