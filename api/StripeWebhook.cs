using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Stripe;
using Microsoft.Extensions.Configuration;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Sinterklaas.Api.Models;
using System.Linq;

namespace Sinterklaas.Api
{
    public static class StripeWebhook
    {
        [FunctionName("StripeWebhook")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "stripe")] HttpRequest req,
            [CosmosDB(ConnectionStringSetting = "CosmosDBConnection")] IDocumentClient client,
            ILogger log, ExecutionContext context)
        {
            var config = new ConfigurationBuilder().SetBasePath(context.FunctionAppDirectory)
                .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();

            var secret = config["Stripe:WebhookSecret"];

            string json = await new StreamReader(req.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = EventUtility.ConstructEvent(json,
                    req.Headers["Stripe-Signature"], secret);

                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    var session = stripeEvent.Data.Object as Stripe.Checkout.Session;

                    log.LogInformation($"Searching for inschrijving with: {session.Id}");
                    
                    Uri collectionUri = UriFactory.CreateDocumentCollectionUri("sinterklaas", "inschrijvingen");

                    var inschrijving = client.CreateDocumentQuery<InschrijvingDataModel>(collectionUri, 
                        new FeedOptions()
                        {
                            PartitionKey = new Microsoft.Azure.Documents.PartitionKey("Sinterklaas")
                        })
                        .Where(i => i.SessionId.Contains(session.Id))
                        .AsEnumerable()
                        .SingleOrDefault();

                    inschrijving.Commentaar = "Document updated"; //TODO
                    await client.ReplaceDocumentAsync(inschrijving._self, inschrijving);
                }

            }
            catch (Exception e)
            {
                log.LogError(e, "Error in Stripe Webhook");
                return new BadRequestResult();
            } 

            return new OkResult();
        }
    }
}
