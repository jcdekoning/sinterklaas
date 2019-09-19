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
using System.Linq;
using Sinterklaas.Api.Models;

namespace Sinterklaas.Api
{
    public static class AddInschrijving
    {
        [FunctionName("AddInschrijving")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "inschrijving")] HttpRequest req,
            [CosmosDB(
                databaseName: "sinterklaas",
                collectionName: "inschrijvingen",
                ConnectionStringSetting = "CosmosDBConnection")] IAsyncCollector<InschrijvingDataModel> inschrijvingenOut,
            ILogger log, ExecutionContext context)
        {
            try {
                var config = new ConfigurationBuilder().SetBasePath(context.FunctionAppDirectory)
                    .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                    .AddEnvironmentVariables()
                    .Build();

                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var inschrijving = JsonConvert.DeserializeObject<InschrijvingViewModel>(requestBody);
                
                StripeConfiguration.ApiKey = config["Stripe:SecretKey"];

                var lineItems = CreateLineItemsFromInschrijving(inschrijving);
                
                var options = new SessionCreateOptions {
                    CustomerEmail = inschrijving.Email,
                    Locale = "nl",
                    PaymentMethodTypes = new List<string> {
                        "card",
                    },
                    LineItems = lineItems.ToList(),
                    SuccessUrl = "https://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
                    CancelUrl = "https://localhost:3000/cancel", //todo config
                };

                var service = new SessionService();
                Session session = await service.CreateAsync(options);
                var sessionId = session.Id;

                await inschrijvingenOut.AddAsync(MapToDataModel(inschrijving, sessionId));

                return new JsonResult(new {
                    sessionId = sessionId
                });
            }
            catch (Exception e) {
                log.LogError(e, "Something went wrong");
                return new BadRequestResult();
            }
        }

    private static IEnumerable<SessionLineItemOptions> CreateLineItemsFromInschrijving(InschrijvingViewModel inschrijving)
    {
      if(inschrijving.Relatie.Equals("NieuwLid", StringComparison.OrdinalIgnoreCase)) {
        yield return new SessionLineItemOptions {
            Name = "Lidmaatschap Nederlandse Club Oslo",
            Description = "2019",
            Amount = 17500,
            Currency = "nok",
            Quantity = 1
        };
      }

      if(inschrijving.AantalPersonen > 2) {
          yield return new SessionLineItemOptions {
            Name = "Bijdrage voor extra personen",
            Amount = 5000,
            Currency = "nok",
            Quantity = inschrijving.AantalPersonen - 2
        };
      }

      foreach(var kind in inschrijving.Kinderen) {
           yield return new SessionLineItemOptions {
                            Name = "Inschrijving Sinterklaas",
                            Description = kind.Voornaam + " " + kind.Achternaam,
                            Amount = 15000,
                            Currency = "nok",
                            Quantity = 1
           };
      }
    }

    private static InschrijvingDataModel MapToDataModel(InschrijvingViewModel inschrijving, string sessionId){
        return new InschrijvingDataModel{
            Commentaar = inschrijving.Commentaar,
            Email = inschrijving.Email,
            Naam = inschrijving.Naam,
            Privacyverklaring = inschrijving.Privacyverklaring,
            SessionId = sessionId,
            Relatie = inschrijving.Relatie,
            Vrijwilliger = inschrijving.Vrijwilliger,
            AantalPersonen = inschrijving.AantalPersonen,
            Kinderen  = inschrijving.Kinderen.Select(k => new KindDataModel{
                Achternaam = k.Achternaam,
                Anekdote = k.Anekdote,
                Geslacht = k.Geslacht,
                Leeftijd = k.Leeftijd,
                Voornaam = k.Voornaam
            }).ToArray()
        };
    }
  }
}
