using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Sinterklaas.Api
{
    public static class LetsEncrypt
    {
        [FunctionName("LetsEncrypt")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "letsencrypt/{code}")]HttpRequest req, string code,
            ILogger log)
        {
            log.LogInformation($"Let's encrypt triggered with {code}");

            var content = File.ReadAllText(@"D:\home\site\wwwroot\.well-known\acme-challenge\"+code);
            return new OkObjectResult(content);
        }
    }
}
