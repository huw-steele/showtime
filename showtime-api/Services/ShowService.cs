using System;
using System.Collections.Generic;
using Showtime.Api.Models;

namespace Showtime.Api.Services
{
    public class ShowService
    {
        public readonly Dictionary<Guid, Show> _shows = new Dictionary<Guid, Show>();

        public Guid CreateShow()
        {
            var newShow = new Show();
            var id = Guid.NewGuid();
            _shows.Add(id, newShow);
            return id;
        }
    }
}