using System.Threading.Tasks;
using PartnerScraper.Models;
using System;

namespace PartnerScraper.Services
{
    public interface IScraper
    {
        /// <summary>
        /// This method initializes a new Scrape 
        /// </summary>
        /// <param name="upc"></param>
        /// <param name="scanId"></param>
        /// <returns>scrape</returns>
		Task<Scrape> GetNewScrape(string upc, Guid scanId);	// GetNewScrape(string, Guid)
    } // IScraper
}