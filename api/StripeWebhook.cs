using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using Stripe;
using Sinterklaas.Api.Models;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Options;

namespace Sinterklaas.Api
{
    public class StripeWebhook
    {
        private readonly CosmosClient _cosmosClient;
        private readonly ILogger<StripeWebhook> _logger;
        private readonly ApiSettings _settings;

        public StripeWebhook(CosmosClient cosmosClient, IOptions<ApiSettings> settings, ILogger<StripeWebhook> logger)
        {
            _cosmosClient = cosmosClient;
            _logger = logger;
            _settings = settings.Value;
        }

        [Function("StripeWebhook")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "stripe")]
            HttpRequestData req, FunctionContext context)
        {
            var secret = _settings.Stripe.WebhookSecret;

            string json = await req.ReadAsStringAsync();

            try
            {
                var stripeSignature = GetStripeSignature(req);
                var stripeEvent = EventUtility.ConstructEvent(json, stripeSignature, secret);

                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    var session = stripeEvent.Data.Object as Stripe.Checkout.Session;

                    _logger.LogInformation($"Searching for inschrijving with: {session.Id}");

                    var container = _cosmosClient.GetContainer("sinterklaas", "inschrijvingen");

                    var query = new QueryDefinition("SELECT * FROM c WHERE CONTAINS(c.SessionId, @sessionId)")
                        .WithParameter("@sessionId", session.Id);

                    var iterator = container.GetItemQueryIterator<InschrijvingDataModel>(query);
                    InschrijvingDataModel inschrijving = null;

                    while (iterator.HasMoreResults)
                    {
                        var response = await iterator.ReadNextAsync();
                        inschrijving = response.FirstOrDefault();
                    }

                    if (inschrijving == null)
                    {
                        throw new InvalidOperationException($"Inschrijving not found with {session.Id}");
                    }

                    inschrijving.Betaald = true;
                    inschrijving.BetaaldOpUtc = DateTime.UtcNow;
                    await container.ReplaceItemAsync(inschrijving, inschrijving.id);

                    var mailService = new MailgunMailService(_settings.MailgunApiKey, _logger);
                    var mailConfigConfirmEmail = _settings.ConfirmEmail;
                    var mailModelConfirmEmail = new InschrijvingEmailModel
                    {
                        Naam = inschrijving.Naam,
                        Email = inschrijving.Email,
                        KindOpSchool = inschrijving.KindOpSchool,
                        LidVanClub = inschrijving.LidVanClub,
                        Lidmaatschap = (!inschrijving.KindOpSchool && !inschrijving.LidVanClub) ||
                                       inschrijving.GratisLidmaatschap,
                        GratisLidmaatschap = inschrijving.GratisLidmaatschap,
                        Straatnaam = inschrijving.Straatnaam,
                        Postcode = inschrijving.Postcode,
                        Plaats = inschrijving.Plaats,
                        Telefoon = inschrijving.Telefoon,
                        AantalKinderen = inschrijving.Kinderen.Length,
                        AantalPersonen = inschrijving.AantalPersonen,
                        Kinderen = inschrijving.Kinderen.Select(k => new KindEmailModel
                        {
                            Roepnaam = k.Voornaam,
                            Achternaam = k.Achternaam,
                            Leeftijd = k.Leeftijd,
                            Geslacht = k.Geslacht,
                            Eten = k.Eten,
                            Speelgoed = k.Speelgoed,
                            Hobby = k.Hobby,
                            RuimteVoorVerbetering = k.RuimteVoorVerbetering,
                            VraagSintEnPiet = k.VraagSintEnPiet
                        }).ToArray(),
                        Commentaar = inschrijving.Commentaar
                    };

                    await mailService.SendMailAsync(mailConfigConfirmEmail.FromName,
                        mailConfigConfirmEmail.FromEmail,
                        inschrijving.Naam,
                        inschrijving.Email,
                        mailConfigConfirmEmail.Bcc,
                        mailConfigConfirmEmail.Subject,
                        mailConfigConfirmEmail.TemplateId,
                        mailModelConfirmEmail);


                    if ((!inschrijving.KindOpSchool && !inschrijving.LidVanClub) || inschrijving.GratisLidmaatschap)
                    {
                        var mailConfigMembershipEmail = _settings.MembershipEmail;
                        var mailModelMembershipEmail = new LidmaatschapEmailViewModel
                        {
                            Naam = inschrijving.Naam,
                            Email = inschrijving.Email,
                            GratisLidmaatschap = inschrijving.GratisLidmaatschap,
                            Straatnaam = inschrijving.Straatnaam,
                            Postcode = inschrijving.Postcode,
                            Plaats = inschrijving.Plaats,
                            Telefoon = inschrijving.Telefoon
                        };
                        await mailService.SendMailAsync(mailConfigMembershipEmail.FromName,
                            mailConfigMembershipEmail.FromEmail,
                            mailConfigMembershipEmail.ToName,
                            mailConfigMembershipEmail.ToEmail,
                            mailConfigMembershipEmail.Bcc,
                            mailConfigMembershipEmail.Subject,
                            mailConfigMembershipEmail.TemplateId,
                            mailModelMembershipEmail);
                    }
                }

            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error in Stripe Webhook");
                
                return req.CreateResponse(HttpStatusCode.BadRequest);
            }

            return req.CreateResponse(HttpStatusCode.OK);
        }

        private static string GetStripeSignature(HttpRequestData requestData)
        {
            if (requestData.Headers.TryGetValues("Stripe-Signature", out IEnumerable<string> values))
            {
                return values.First();
            }

            throw new InvalidOperationException("No stripe signature found");
        }
    }

}
