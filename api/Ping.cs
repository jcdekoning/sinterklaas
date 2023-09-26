using System.Net;
using System.Text.Json;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Sinterklaas.Api
{
    public class Ping
    {
        private readonly ILogger<Ping> _log;

        public Ping(ILogger<Ping> log)
        {
            _log = log;
        }
        
        [Function("Ping")]
        public HttpResponseData Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "ping")] HttpRequestData req)
        {
            var json = JsonSerializer.Serialize("Pong!");
            var response = req.CreateResponse(HttpStatusCode.OK);
            response.Headers.Add("Content-Type", "text/json; charset=utf-8");
            response.WriteString(json);
            return response;
        }
    }
}
