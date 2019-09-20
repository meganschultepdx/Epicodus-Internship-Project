namespace PartnerScraper.Models
{
    public class Partner
    {
        public int Id { get; set; }
        public string PartnerName { get; set; }

        #region Constructors
        public Partner(string partnerName, int id)
        {
            Id = id;
            PartnerName = partnerName;
        }   // Partner(string)

        // Empty constructor is only here to make Entity happy
        public Partner()
        { }

        public Partner(string partnerName)
        {
            PartnerName = PartnerName;
        }
        #endregion
    }   // Partner
}