using System;
using System.Collections.Generic;

namespace Showtime.Api.Services
{
    public class ShowService
    {
        public readonly Dictionary<Guid, Show> _shows = new Dictionary<Guid, Show>();

        public (Guid, Show) CreateShow()
        {
            var newShow = new Show();
            var id = Guid.NewGuid();
            _shows.Add(id, newShow);
            return (id, newShow);
        }
    }
}