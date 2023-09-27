using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Sinterklaas.Api.Models;
using Stripe;
using Stripe.Checkout;

namespace Sinterklaas.Api
{
    public class AddInschrijving
    {
        private readonly CosmosClient _cosmosClient;
        private readonly ILogger<AddInschrijving> _logger;
        private readonly ApiSettings _settings;

        public AddInschrijving(CosmosClient cosmosClient, IOptions<ApiSettings> settings, ILogger<AddInschrijving> logger)
        {
            _cosmosClient = cosmosClient;
            _logger = logger;
            _settings = settings.Value;
        }
        
        [Function("AddInschrijving")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "inschrijving")] HttpRequestData req, FunctionContext context)
        {
            try
            {
                _logger.LogInformation($"Add inschrijving triggered");

                var requestBody = await req.ReadAsStringAsync();
                var inschrijving = JsonConvert.DeserializeObject<InschrijvingViewModel>(requestBody);
                _logger.LogInformation($"Inschrijving received for {inschrijving.Naam}");
                
                StripeConfiguration.ApiKey = _settings.Stripe.SecretKey;
                
                var lineItems = CreateLineItemsFromInschrijving(inschrijving, _logger);
                _logger.LogInformation($"{lineItems.Count()} line items created");
                
                var frontendUrl = _settings.FrontendUrl;

                var options = new SessionCreateOptions
                {
                    CustomerEmail = inschrijving.Email,
                    Locale = "nl",
                    PaymentMethodTypes = new List<string>
                    {
                        "card",
                    },
                    LineItems = lineItems.ToList(),
                    SuccessUrl = $"{frontendUrl}/success?session_id={{CHECKOUT_SESSION_ID}}",
                    CancelUrl = $"{frontendUrl}/cancel"
                };
                
                _logger.LogInformation("Creating stripe session");
                
                var service = new SessionService();
                Session session = await service.CreateAsync(options);
                var sessionId = session.Id;
                
                _logger.LogInformation($"Stripe session created {sessionId}");
                
                _logger.LogInformation("Save inschrijving to database");
                var container = _cosmosClient.GetContainer("sinterklaas", "inschrijvingen");
                var inschrijvingData = MapToDataModel(Guid.NewGuid(), inschrijving, sessionId,
                    options.LineItems.Where(l => l.Amount.HasValue).Sum(l => l.Amount.Value));
                await container.CreateItemAsync(inschrijvingData);

                _logger.LogInformation("Inschrijving saved. Returning sessionId to consumer");
                
                var json = JsonConvert.SerializeObject(new
                {
                    sessionId = sessionId
                });
                var response = req.CreateResponse(HttpStatusCode.OK);
                response.Headers.Add("Content-Type", "text/json; charset=utf-8");
                await response.WriteStringAsync(json);
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Something went wrong {ex.Message}");

                var json = JsonConvert.SerializeObject(new
                {
                    Error = ex.Message,
                    InvocationId = context.InvocationId
                });
                var response = req.CreateResponse(HttpStatusCode.BadRequest);
                response.Headers.Add("Content-Type", "text/json; charset=utf-8");
                await response.WriteStringAsync(json);
                return response;
            }
        }

    private static IEnumerable<SessionLineItemOptions> CreateLineItemsFromInschrijving(InschrijvingViewModel inschrijving, ILogger log)
    {
      log.LogInformation($"KindOpSchool is {inschrijving.KindOpSchool} and LidVanClub is {inschrijving.LidVanClub}");
      if(!inschrijving.KindOpSchool && !inschrijving.LidVanClub) {
        log.LogInformation("Person needs a club subscription. Creating line item");
        yield return new SessionLineItemOptions {
            Name = "Lidmaatschap Nederlandse Club Oslo",
            Description = "2023",
            Amount = 35000,
            Currency = "nok",
            Quantity = 1
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
    
    private static InschrijvingDataModel MapToDataModel(Guid id, InschrijvingViewModel inschrijving, string sessionId, long bedrag){
        return new InschrijvingDataModel{
            id = id.ToString(),
            Commentaar = inschrijving.Commentaar,
            Email = inschrijving.Email,
            Naam = inschrijving.Naam,
            Privacyverklaring = inschrijving.Privacyverklaring,
            SessionId = sessionId,
            LidVanClub = inschrijving.LidVanClub,
            KindOpSchool = inschrijving.KindOpSchool,
            GratisLidmaatschap = inschrijving.GratisLidmaatschap,
            Straatnaam = inschrijving.Straatnaam,
            Postcode = inschrijving.Postcode,
            Plaats = inschrijving.Plaats,
            Telefoon = inschrijving.Telefoon,
            AantalPersonen = inschrijving.AantalPersonen,
            Kinderen  = inschrijving.Kinderen.Select(k => new KindDataModel{
                Achternaam = k.Achternaam,
                Eten = k.Eten,
                Speelgoed = k.Speelgoed,
                Hobby = k.Hobby,
                RuimteVoorVerbetering = k.RuimteVoorVerbetering,
                VraagSintEnPiet = k.VraagSintEnPiet,
                Geslacht = k.Geslacht,
                Leeftijd = k.Leeftijd,
                Voornaam = k.Voornaam
            }).ToArray(),
            Bedrag = bedrag
        };
    }
  }
}
