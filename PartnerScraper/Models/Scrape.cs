using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;
using System;
using System.Collections.Generic;

namespace PartnerScraper.Models
{
    public class Scrape
    {
        public Guid Id { get; set; }
        public Guid ScanId { get; set; }
        public int PartnerId { get; set; }
        public bool IsLive { get; set; }
        public string URL { get; set; }
        public string UPC { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string PartnerName { get; set; }

        #region Constructors
        public Scrape(Guid scanId, int partnerId, bool isLive, string url, string upc, string partnerName)
        {
            Id = Guid.NewGuid();
            ScanId = scanId;
            PartnerId = partnerId;
            IsLive = isLive;
            URL = url;
            UPC = upc;
            CreatedDate = DateTime.Now;
            ModifiedDate = DateTime.Now;
            PartnerName = partnerName;
        }   // Scrape(Guid, int, bool, string, string, Partner)

        // Empty constructor is only here to make Entity happy
        public Scrape()
        { } //Scrape()
        #endregion
    }   // Scrape
}
