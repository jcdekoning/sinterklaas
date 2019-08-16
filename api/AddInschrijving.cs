using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Stripe;
using Stripe.Checkout;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace Api
{
    public static class AddInschrijving
    {
        [FunctionName("AddInschrijving")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "inschrijving")] HttpRequest req,
            ILogger log, ExecutionContext context)
        {
            var config = new ConfigurationBuilder().SetBasePath(context.FunctionAppDirectory)
                .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();

            StripeConfiguration.ApiKey = config["Stripe:SecretKey"];

            var options = new SessionCreateOptions {
                CustomerEmail = "johan@nederlandsecluboslo.nl",
                Locale = "nl",
                PaymentMethodTypes = new List<string> {
                    "card",
                },
                LineItems = new List<SessionLineItemOptions> {
                    new SessionLineItemOptions {
                        Name = "Inschrijving Sinterklaas",
                        Description = "Voor Henk",
                        Amount = 15000,
                        Currency = "nok",
                        Quantity = 1,
                    },
                    new SessionLineItemOptions {
                        Name = "Inschrijving Sinterklaas",
                        Description = "Voor Anja",
                        Amount = 15000,
                        Currency = "nok",
                        Quantity = 1,
                    }
                },
                SuccessUrl = "https://localhost:3000/success",
                CancelUrl = "https://localhost:3000/cancel",
            };

            var service = new SessionService();
            Session session = await service.CreateAsync(options);

            return new JsonResult(new {
                sessionId = session.Id
            });
        }
    }
}
