using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace Sinterklaas.Api
{
    public static class GetInschrijvingen
    {
        [FunctionName("GetInschrijvingen")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "inschrijvingen")] HttpRequest req,
            [CosmosDB(
                databaseName: "sinterklaas",
                collectionName: "inschrijvingen",
                PartitionKey = "COMPLETE",
                ConnectionStringSetting = "CosmosDBConnection",
                SqlQuery = "SELECT * FROM c")]
                IEnumerable<Inschrijving> inschrijvingen, 
            ILogger log)
        {
            return new JsonResult(inschrijvingen);
        }
    }
}
