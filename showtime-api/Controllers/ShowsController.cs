using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Showtime.Api.Services;

namespace Showtime.Api.Controllers
{
    [Route("api/[controller]")]
    public class ShowsController : Controller
    {
        private readonly ShowService _showService;

        public ShowsController(ShowService showService)
        {
            _showService = showService;
        }

        [HttpPost]
        public IActionResult Create()
        {
            var (id, show) = _showService.CreateShow();
            return Ok(new Responses.Show
            {
                Id = id
            });
        }
    }
}