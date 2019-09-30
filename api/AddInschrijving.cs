using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
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
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "inschrijving")] InschrijvingViewModel inschrijving,
            [CosmosDB(
                databaseName: "sinterklaas",
                collectionName: "inschrijvingen",
                ConnectionStringSetting = "CosmosDBConnection")] IAsyncCollector<InschrijvingDataModel> inschrijvingenOut,
            ILogger log, ExecutionContext context)
        {
            try {
                log.LogInformation($"Add inschrijving triggered for {inschrijving}");

                var config = new ConfigurationBuilder().SetBasePath(context.FunctionAppDirectory)
                    .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                    .AddEnvironmentVariables()
                    .Build();
                
                StripeConfiguration.ApiKey = config["Stripe:SecretKey"];

                var lineItems = CreateLineItemsFromInschrijving(inschrijving, log);

                log.LogInformation($"{lineItems.Count()} line items created");
                
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

                log.LogInformation("Creating stripe session");
                
                var service = new SessionService();
                Session session = await service.CreateAsync(options);
                var sessionId = session.Id;

                log.LogInformation($"Stripe session created {sessionId}");

                log.LogInformation("Save inschrijving to database");
                await inschrijvingenOut.AddAsync(MapToDataModel(inschrijving, sessionId, 
                    options.LineItems.Where(l => l.Amount.HasValue).Sum(l => l.Amount.Value)));
                log.LogInformation("Inschrijving saved. Returning sessionId to consumer");

                return new JsonResult(new {
                    sessionId = sessionId
                });
            }
            catch (Exception e) {
                log.LogError(e, $"Something went wrong {e.Message}");
                return new BadRequestResult();
            }
        }

    private static IEnumerable<SessionLineItemOptions> CreateLineItemsFromInschrijving(InschrijvingViewModel inschrijving, ILogger log)
    {
      log.LogInformation($"KindOpSchool is {inschrijving.KindOpSchool} and LidVanClub is {inschrijving.LidVanClub}");
      if(!inschrijving.KindOpSchool && !inschrijving.LidVanClub) {
        log.LogInformation("Person needs a club subscription. Creating line item");
        yield return new SessionLineItemOptions {
            Name = "Lidmaatschap Nederlandse Club Oslo",
            Description = "2019",
            Amount = 17500,
            Currency = "nok",
            Quantity = 1
        };
      }

      log.LogInformation($"AantalPersonen is {inschrijving.AantalPersonen}");
      
      if(inschrijving.AantalPersonen > 2) {
          log.LogInformation("More then two personen. Creating line item");
          yield return new SessionLineItemOptions {
            Name = "Bijdrage voor extra personen",
            Amount = 5000,
            Currency = "nok",
            Quantity = inschrijving.AantalPersonen - 2
        };
      }

      log.LogInformation($"AantalKinderen is {inschrijving.Kinderen.Count()}");

      foreach(var kind in inschrijving.Kinderen) {
          log.LogInformation("Creating line item for kind");
           yield return new SessionLineItemOptions {
                            Name = "Inschrijving Sinterklaas",
                            Description = kind.Voornaam + " " + kind.Achternaam,
                            Amount = 15000,
                            Currency = "nok",
                            Quantity = 1
           };
      }
    }

    private static InschrijvingDataModel MapToDataModel(InschrijvingViewModel inschrijving, string sessionId, long bedrag){
        return new InschrijvingDataModel{
            Commentaar = inschrijving.Commentaar,
            Email = inschrijving.Email,
            Naam = inschrijving.Naam,
            Privacyverklaring = inschrijving.Privacyverklaring,
            SessionId = sessionId,
            LidVanClub = inschrijving.LidVanClub,
            KindOpSchool = inschrijving.KindOpSchool,
            GratisLidmaatschap = inschrijving.GratisLidmaatschap,
            Adres = inschrijving.Adres,
            Telefoon = inschrijving.Telefoon,
            Vrijwilliger = inschrijving.Vrijwilliger,
            AantalPersonen = inschrijving.AantalPersonen,
            Kinderen  = inschrijving.Kinderen.Select(k => new KindDataModel{
                Achternaam = k.Achternaam,
                Anekdote = k.Anekdote,
                Geslacht = k.Geslacht,
                Leeftijd = k.Leeftijd,
                Voornaam = k.Voornaam
            }).ToArray(),
            Bedrag = bedrag
        };
    }
  }
}
