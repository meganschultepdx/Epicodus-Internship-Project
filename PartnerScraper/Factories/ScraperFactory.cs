using Microsoft.Extensions.Options;
using PartnerScraper.Config;
using PartnerScraper.Enums;
using PartnerScraper.Models.PartnerScrapers;
using PartnerScraper.Services;
using System.Net.Http;
using System;

namespace PartnerScraper.Factories
{
    public class ScraperFactory
    {
        #region Fields
        private readonly PartnerSettings _PartnerSettings;
        private readonly HttpClient _Client;
        #endregion

        #region Constructors
        public ScraperFactory(IOptions<PartnerSettings> partnerSettings, IHttpClientFactory clientFactory)
        {
            _PartnerSettings = partnerSettings.Value;
            _Client = clientFactory.CreateClient();
        } // ScraperFactory(IOptions<PartnerSettings, IHttpClientFactory)
        #endregion

        #region Public Methods
        /// <summary>
        /// Determines which partner scraper to build.
        /// </summary>
        /// <param name="partner">The Id of the partner to build the scraper for.</param>
        /// <returns>A scraper instance configured for the specific partner</returns>
        public IScraper GetPartnerScraper(Partners partner)
        {
            IScraper scraper = null;

            switch (partner)
            {
                case Partners.ITunes:
                    scraper = new ITunesScraper(_PartnerSettings.ITunesSettings, _Client);
                    break;
                case Partners.Spotify:
                    //scraper = new SpotifyScraper
                    break;
                case Partners.Unknown:
                default:
                    // should never be here.
                    Console.WriteLine("Invalid partner submitted for Factory.");
                    break;
            }   // switch

            return scraper;
        }   // GetPartnerScraper(Partners)
        #endregion
    } // ScraperFactory
}