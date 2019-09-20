using PartnerScraper.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PartnerScraper.Services
{
    public interface IScanService
    {
        /// <summary>
        /// This method initializes a new Scan and saves the Scan to the db.
        /// </summary>
        /// <param name="upc"></param>
        /// <returns>void</returns>
        Task StartScan(string upc); // StartScan(string)

        /// <summary>
        /// This method searches the db scan table and returns in descending order all scans that match the upc.
        /// </summary>
        /// <param name="upc"></param>
        /// <returns>List of scans.</returns>
        Task<List<Scan>> GetScans(string upc); // GetScans(string)

        /// <summary>
        /// This method returns all scans in the db scan table in descending order.
        /// </summary>
        /// <param></param>
        /// <returns>List of scans.</returns>
        Task<List<Scan>> GetAllScans(); // GetAllScans()

        // Logic needs moved into a IScrapeService
        /// <summary>
        /// This method returns all scrapes in the db scan table in descending order.
        /// </summary>
        /// <param></param>
        /// <returns>List of scrapes.</returns>
        Task<List<Scrape>> GetAllScrapes(); // GetAllScrapes()

    } // IScanService
}