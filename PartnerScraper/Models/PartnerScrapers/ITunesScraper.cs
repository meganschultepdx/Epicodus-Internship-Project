using Newtonsoft.Json;
using PartnerScraper.Config;
using PartnerScraper.Enums;
using PartnerScraper.Services;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace PartnerScraper.Models.PartnerScrapers
{
    public class ITunesScraper : IScraper
    {
        #region Fields
        private string _PartnerUri;
        private readonly HttpClient _Client;
        #endregion

        #region Constructors
        public ITunesScraper(ITunesSettings config, HttpClient client)
        {
            // gets the ITunes URI from the PartnerSettings Config
            _PartnerUri = config.PartnerBaseUri;
            _Client = client;
        } // ITunesScraper(ITunesSettings, HttpClient)
        #endregion

        #region Public Methods
        public async Task<Scrape> GetNewScrape(string upc, Guid scanId)
        {
            string getUrl = _PartnerUri + upc;
            Scrape scrape = new Scrape(scanId, (int)Partners.ITunes, false, getUrl, upc, "iTunes");

            try
            {
                HttpResponseMessage response = await _Client.GetAsync(getUrl);
                string json = response.Content.ReadAsStringAsync().Result;
                dynamic upcResultCount = JsonConvert.DeserializeObject<dynamic>(json);

                if (response.IsSuccessStatusCode)
                {
                    if (upcResultCount["resultCount"] > 0)
                    {
                        scrape.IsLive = true;
                    }	// if
                    else
                    {
                        scrape.IsLive = false;
                    }	// else
                }	// if
            }	// try
            catch (Exception e)
            {
                Console.WriteLine($"Request to client was not successful. Exception message: {e.InnerException}");
            }	// catch
            return scrape;
        } // GetNewScrape(string, Guid)
        #endregion
    }	// ITunesScraper
}