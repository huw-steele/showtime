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
        private readonly ShowSocketManager _showSocketManager;

        public ShowsController(ShowService showService, ShowSocketManager manager)
        {
            _showService = showService;
            _showSocketManager = manager;
        }

        [HttpPost]
        public IActionResult Create()
        {
            var id = _showService.CreateShow();
            return Ok(id);
        }

        [HttpGet("{showId:guid}/connect")]
        public async Task<IActionResult> Connect(Guid showId)
        {
            if (!HttpContext.WebSockets.IsWebSocketRequest) return BadRequest();
            using (var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync()) {
                await _showSocketManager.Connect(showId, webSocket, HttpContext.RequestAborted);
            }
            return new EmptyResult();
        }
    }
}