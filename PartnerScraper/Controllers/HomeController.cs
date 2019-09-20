using Microsoft.AspNetCore.Mvc;
using PartnerScraper.Models;
using System.Diagnostics;

namespace PartnerScraper.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }   // Index()

        #region Error
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }   // Error()
        #endregion
    }	// HomeController
}
