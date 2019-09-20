using Microsoft.EntityFrameworkCore;
using PartnerScraper.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PartnerScraper.Services
{
    public class ScanService : IScanService
    {
        #region Fields
        private PartnerScraperContext _Context;
        private ScrapeService _ScrapeService;
        #endregion

        #region Constructors
        public ScanService(PartnerScraperContext context, ScrapeService scrapeService)
        {
            _Context = context;
            _ScrapeService = scrapeService;
        } // ScanService(PartnerScraperContext, ScrapeService)
        #endregion

        #region Public Methods
        // Method to create new scans and scrapes and save them to db
        public async Task StartScan(string upc)
        {
            Scan newScan = new Scan(upc);
            List<Scrape> scrapes = await _ScrapeService.CreateScrapes(upc, newScan.Id);
            _Context.Scans.Add(newScan);
            _Context.SaveChanges();
            foreach (Scrape scrape in scrapes)
            {
                _Context.Scrapes.Add(scrape);
            }	// foreach
            await _Context.SaveChangesAsync();
        } // StartScan(string)

        // Method to return a list of matches for UPC search
        public async Task<List<Scan>> GetScans(string upc)
        {
            List<Scan> upcMatches = _Context.Scans
                .Where(scan => scan.UPC == upc)
                .Include(scan => scan.Scrapes)
                .ToList();

            // Sorts the list in descending order by CreatedDate, to reverse swap x & y
            upcMatches.Sort((x, y) => y.CreatedDate.CompareTo(x.CreatedDate));
            return upcMatches;
        } // GetScans(string)

        // Method to return all scans in the DB
        public async Task<List<Scan>> GetAllScans()
        {
            List<Scan> allScans = _Context.Scans
                .Include(scan => scan.Scrapes)
                .ToList();

            // Sorts the list in descending order by CreatedDate, to reverse swap x & y
            allScans.Sort((x, y) => y.CreatedDate.CompareTo(x.CreatedDate));
            return allScans;
        } // GetScans(string)


        // Logic needs moved into a Scrape Service
        // Method to return all scrapes in the DB
        public async Task<List<Scrape>> GetAllScrapes()
        {
            List<Scrape> allScrapes = _Context.Scrapes.ToList();

            // Sorts the list in descending order by CreatedDate, to reverse swap x & y
            allScrapes.Sort((x, y) => y.CreatedDate.CompareTo(x.CreatedDate));
            return allScrapes;
        } // GetAllScrapes
        #endregion
    } //ScanService
}