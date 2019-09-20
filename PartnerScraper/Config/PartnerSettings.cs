namespace PartnerScraper.Config
{
    public class PartnerSettings
    {
        public ITunesSettings ITunesSettings { get; set; }
    }	// PartnerSettings

    public class ITunesSettings
    {
        public int PartnerId { get; set; }
        public string PartnerBaseUri { get; set; }
    }	// ITunesSettings
}