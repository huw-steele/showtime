using System;
using System.Collections.Concurrent;
using System.IO;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Showtime.Api
{

    public class ShowSocketManager
    {
        private readonly ConcurrentDictionary<Guid, ConcurrentBag<WebSocket>> shows = new ConcurrentDictionary<Guid, ConcurrentBag<WebSocket>>();

        public async Task Connect(Guid showId, WebSocket s, CancellationToken ct)
        {
            var bag = new ConcurrentBag<WebSocket>();
            if (!shows.TryAdd(showId, bag))
            {
                shows.TryGetValue(showId, out bag);
            }
            bag.Add(s);

            while (true)
            {
                if (ct.IsCancellationRequested)
                {
                    break;
                }

                var response = await ReceiveStringAsync(s, ct);
                if (string.IsNullOrEmpty(response))
                {
                    if (s.State != WebSocketState.Open)
                    {
                        break;
                    }

                    continue;
                }

                foreach (var socket in bag)
                {
                    if (socket.State != WebSocketState.Open)
                    {
                        continue;
                    }

                    await SendStringAsync(socket, response, ct);
                }
            }
        }

         private static Task SendStringAsync(WebSocket socket, string data, CancellationToken ct = default(CancellationToken))
    {
        var buffer = Encoding.UTF8.GetBytes(data);
        var segment = new ArraySegment<byte>(buffer);
        return socket.SendAsync(segment, WebSocketMessageType.Text, true, ct);
    }

        private static async Task<string> ReceiveStringAsync(WebSocket socket, CancellationToken ct = default(CancellationToken))
        {
            var buffer = new ArraySegment<byte>(new byte[8192]);
            using (var ms = new MemoryStream())
            {
                WebSocketReceiveResult result;
                do
                {
                    ct.ThrowIfCancellationRequested();

                    result = await socket.ReceiveAsync(buffer, ct);
                    ms.Write(buffer.Array, buffer.Offset, result.Count);
                }
                while (!result.EndOfMessage);

                ms.Seek(0, SeekOrigin.Begin);
                if (result.MessageType != WebSocketMessageType.Text)
                {
                    return null;
                }

                // Encoding UTF8: https://tools.ietf.org/html/rfc6455#section-5.6
                using (var reader = new StreamReader(ms, Encoding.UTF8))
                {
                    return await reader.ReadToEndAsync();
                }
            }
        }
    }
}