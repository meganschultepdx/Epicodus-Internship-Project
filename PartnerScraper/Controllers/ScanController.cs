using Microsoft.AspNetCore.Mvc;
using PartnerScraper.Models;
using PartnerScraper.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PartnerScraper.Controllers
{
    [Route("api/scans")]
    public class ScanController : Controller
    {
        private IScanService _ScanService;

        public ScanController(IScanService scanService)
        {
            _ScanService = scanService;
        }   // ScanController(IScanService)

        [HttpGet("startscan/{upc}")]
        public async Task<IActionResult> StartScan(string upc)
        {
            if (string.IsNullOrEmpty(upc))
            {
                return BadRequest();
            }   // if

            try
            {
                await _ScanService.StartScan(upc);
            }   // try
            catch (Exception e)
            {
                return StatusCode(500);
            }   // catch

            return Ok();
        }	// StartScan(string)

        [HttpGet("getscans/{upc}")]
        public async Task<IActionResult> GetScans(string upc)
        {
            List<Scan> upcMatches;

            if (string.IsNullOrEmpty(upc))
            {
                return BadRequest();
            }   // if

            try
            {
                upcMatches = await _ScanService.GetScans(upc);
            }   //try
            catch (Exception e)
            {
                return StatusCode(500);
            }   // catch

            return Json(upcMatches);
        }	// GetScans(string)

        [HttpGet("allscans")]
        public async Task<IActionResult> GetAllScans()
        {
            List<Scan> allScans;

            try
            {
                allScans = await _ScanService.GetAllScans();
            }   //try
            catch (Exception e)
            {
                return StatusCode(500);
            }   // catch

            return Json(allScans);
        }	// GetAllScans()

        // Logic needs moved into a Scrape Controller
        [HttpGet("allscrapes")]
        public async Task<IActionResult> GetAllScrapes()
        {
            List<Scrape> allScrapes;

            try
            {
                allScrapes = await _ScanService.GetAllScrapes();
            }   //try
            catch (Exception e)
            {
                return StatusCode(500);
            }   // catch

            return Json(allScrapes);
        }	// GetAllScrapes()
    }	// ScanController
}
