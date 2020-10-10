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
using SendGrid.Helpers.Mail;
using SendGrid;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Sinterklaas.Api
{
    public static class StripeWebhook
    {
        [FunctionName("StripeWebhook")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "stripe")] HttpRequest req,
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

                    inschrijving.Betaald = true;
                    inschrijving.BetaaldOpUtc = DateTime.UtcNow;
                    await client.ReplaceDocumentAsync(inschrijving._self, inschrijving);

                    //var sendGridApiKey = config["SendGridApiKey"];

                    //var mailClient = new SendGridClient(sendGridApiKey);

                    //var confirmEmail = ConstructConfirmEmail(inschrijving, config.GetSection("ConfirmEmail"));
                    //await mailClient.SendEmailAsync(confirmEmail);

                    var mailGunApiKey = config["MailgunApiKey"];

                    using (var mailClient = new HttpClient { BaseAddress = new Uri("https://api.eu.mailgun.net") })
                    {
                        mailClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                            Convert.ToBase64String(Encoding.ASCII.GetBytes($"api:{mailGunApiKey}")));

                        var fromEmail = config["FromEmail"];
                        var fromName = config["FromName"];
                        var bcc = config["Bcc"];
            
                        var content = new FormUrlEncodedContent(new[]
                        {
                            new KeyValuePair<string, string>("from", $"{fromName} <{fromEmail}>"),
                            new KeyValuePair<string, string>("to", $"{inschrijving.Naam} <{inschrijving.Email}>"),
                            new KeyValuePair<string, string>("bcc", bcc),
                            new KeyValuePair<string, string>("subject", "Bevestiging inschrijving Sinterklaas 2020"),
                            new KeyValuePair<string, string>("template", "inschrijving_sinterklaas_2020"),
                            new KeyValuePair<string, string>("h:X-Mailgun-Variables", JsonConvert.SerializeObject(new InschrijvingEmailModel{
                                Naam = inschrijving.Naam,
                                Email = inschrijving.Email,
                                KindOpSchool = inschrijving.KindOpSchool,
                                LidVanClub = inschrijving.LidVanClub,
                                Lidmaatschap = (!inschrijving.KindOpSchool && !inschrijving.LidVanClub) || inschrijving.GratisLidmaatschap,
                                GratisLidmaatschap = inschrijving.GratisLidmaatschap,
                                Straatnaam = inschrijving.Straatnaam,
                                Postcode = inschrijving.Postcode,
                                Plaats = inschrijving.Plaats,
                                Telefoon = inschrijving.Telefoon,
                                AantalKinderen = inschrijving.Kinderen.Length,
                                Kinderen = inschrijving.Kinderen.Select(k => new KindEmailModel{
                                    Roepnaam = k.Voornaam,
                                    Achternaam = k.Achternaam,
                                    Leeftijd = k.Leeftijd,
                                    Geslacht = k.Geslacht,
                                    Anekdote = k.Anekdote
                                }).ToArray(),
                                Commentaar = inschrijving.Commentaar
                            }))
                        });

                        log.LogInformation("Sending email with Mailgun");

                        var result = await mailClient.PostAsync("v3/mg.nederlandsecluboslo.nl/messages", content);
                        var resultContentAsString = await result.Content.ReadAsStringAsync();
                        if(!result.IsSuccessStatusCode){
                            log.LogError($"Error sending email {result.StatusCode} {resultContentAsString}");
                        } else {
                            log.LogInformation($"Successfully send email {resultContentAsString}");
                        }
                    }
                

                    if((!inschrijving.KindOpSchool && !inschrijving.LidVanClub) || inschrijving.GratisLidmaatschap){
                        // var membershipEmail = ConstructMembershipEmail(inschrijving, config.GetSection("MembershipEmail"));
                        // await mailClient.SendEmailAsync(membershipEmail);
                    }
                }

            }
            catch (Exception e)
            {
                log.LogError(e, "Error in Stripe Webhook");
                return new BadRequestResult();
            } 

            return new OkResult();
        }

        private static SendGridMessage ConstructConfirmEmail(InschrijvingDataModel inschrijving, IConfigurationSection config){
            var fromEmail = config["FromEmail"];
            var fromName = config["FromName"];
            var bcc = config["Bcc"];
            var templateId = config["TemplateId"];

            var message = new SendGridMessage();
            message.SetFrom(fromEmail, fromName);
            message.AddTo(inschrijving.Email, inschrijving.Naam);
            message.AddBcc(bcc);
            
            message.SetTemplateId(templateId);
            message.SetTemplateData(new InschrijvingEmailModel{
                Naam = inschrijving.Naam,
                Email = inschrijving.Email,
                KindOpSchool = inschrijving.KindOpSchool,
                LidVanClub = inschrijving.LidVanClub,
                Lidmaatschap = (!inschrijving.KindOpSchool && !inschrijving.LidVanClub) || inschrijving.GratisLidmaatschap,
                GratisLidmaatschap = inschrijving.GratisLidmaatschap,
                Straatnaam = inschrijving.Straatnaam,
                Postcode = inschrijving.Postcode,
                Plaats = inschrijving.Plaats,
                Telefoon = inschrijving.Telefoon,
                AantalKinderen = inschrijving.Kinderen.Length,
                Kinderen = inschrijving.Kinderen.Select(k => new KindEmailModel{
                    Roepnaam = k.Voornaam,
                    Achternaam = k.Achternaam,
                    Leeftijd = k.Leeftijd,
                    Geslacht = k.Geslacht,
                    Anekdote = k.Anekdote
                }).ToArray(),
                Commentaar = inschrijving.Commentaar
            });

            return message;
        }

        private static SendGridMessage ConstructMembershipEmail(InschrijvingDataModel inschrijving, IConfigurationSection config){
            var fromEmail = config["FromEmail"];
            var toEmail = config["ToEmail"];
            var templateId = config["TemplateId"];

            var message = new SendGridMessage();
            message.SetFrom(fromEmail);
            message.AddTo(toEmail);
            
            message.SetTemplateId(templateId);
            message.SetTemplateData(new LidmaatschapEmailViewModel{
                Naam = inschrijving.Naam,
                Email = inschrijving.Email,
                GratisLidmaatschap = inschrijving.GratisLidmaatschap,
                Straatnaam = inschrijving.Straatnaam,
                Postcode = inschrijving.Postcode,
                Plaats = inschrijving.Plaats,
                Telefoon = inschrijving.Telefoon
            });

            return message;
        }
    }    
}
