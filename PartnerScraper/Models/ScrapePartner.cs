using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;
using System;

namespace PartnerScraper.Models
{
    public class ScrapePartner
    {
        public Guid Id { get; set; }
        public Guid ScrapeId { get; set; }
        public int PartnerId { get; set; }

        #region Constructors
        public ScrapePartner(Guid scrapeId, int partnerId)
        {
            Id = Guid.NewGuid();
            ScrapeId = scrapeId;
            PartnerId = partnerId;
        } // ScrapeParther(int, int)

        // Empty constructor is only here to make Entity happy
        public ScrapePartner()
        { } //ScrapePartner()
        #endregion
    }   // ScrapePartner
}