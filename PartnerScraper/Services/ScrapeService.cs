using PartnerScraper.Enums;
using PartnerScraper.Factories;
using PartnerScraper.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace PartnerScraper.Services
{
    public class ScrapeService
    {
        #region Fields
        protected readonly HttpClient _Client;
        protected readonly ScraperFactory _ScraperFactory;
        protected readonly List<Partners> _ActivePartners;
        #endregion

        #region Constructors
        public ScrapeService(IHttpClientFactory clientFactory, ScraperFactory scraperFactory)
        {
            _ScraperFactory = scraperFactory;
            _Client = clientFactory.CreateClient();
            _ActivePartners = Enum.GetValues(typeof(Partners)).Cast<Partners>().ToList();
        } // ScrapeService
        #endregion

        #region Public Methods
        /// <summary>
        /// Gets scrape result for each active partner
        /// </summary>
        /// <param name="upc">the upc to get a scrape for</param>
        /// <param name="scanId"> The id of the current scan</param>
        /// <returns></returns>
        public async Task<List<Scrape>> CreateScrapes(string upc, Guid scanId)
        {
            //create a list to hold the asynch scrape tasks.
            List<Task<Scrape>> scrapeTasks = new List<Task<Scrape>>();

            //loop through each partner and create a scraper for that partner
            foreach (Partners currentPartner in _ActivePartners)
            {
                IScraper activeScraper = _ScraperFactory.GetPartnerScraper(currentPartner);

                if (activeScraper != null)
                {
                    // add the get scrape task to the task list to be processed later.
                    scrapeTasks.Add(activeScraper.GetNewScrape(upc, scanId));
                } // if
            } // foreach

            // wait for all of the async tasks we queued up to finish
            var result = await Task.WhenAll(scrapeTasks);

            // return the results of the scrape for all partners as a list
            return result.ToList();
        } // CreateScrapes(string, Guid)
        #endregion
    }	// ScrapeService
}