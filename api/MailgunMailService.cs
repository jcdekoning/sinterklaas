using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

public class MailgunMailService : IMailService
{
    private readonly string _apiKey;
    private readonly ILogger _log;
    private readonly HttpClient _client;

    public MailgunMailService(string apiKey, ILogger log)
    {
        _apiKey = apiKey;
        _log = log;

        _client = new HttpClient { BaseAddress = new Uri("https://api.eu.mailgun.net")};
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                Convert.ToBase64String(Encoding.ASCII.GetBytes($"api:{apiKey}")));
    }

    public async Task SendMailAsync(string fromName, string fromEmail, string toName, string toEmail, string bcc, string subject, string templateId, object model)
    {   
        var content = new FormUrlEncodedContent(new[]
        {
            new KeyValuePair<string, string>("from", $"{fromName} <{fromEmail}>"),
            new KeyValuePair<string, string>("to", $"{toName} <{toEmail}>"),
            new KeyValuePair<string, string>("bcc", bcc),
            new KeyValuePair<string, string>("subject", subject),
            new KeyValuePair<string, string>("template", templateId),
            new KeyValuePair<string, string>("h:X-Mailgun-Variables", JsonConvert.SerializeObject(model))
        });

        _log.LogInformation("Sending email with Mailgun");

        var result = await _client.PostAsync("v3/mg.nederlandsecluboslo.nl/messages", content);
        var resultContentAsString = await result.Content.ReadAsStringAsync();
        if(!result.IsSuccessStatusCode){
            _log.LogError($"Error sending email {result.StatusCode} {resultContentAsString}");
        } else {
            _log.LogInformation($"Successfully send email {resultContentAsString}");
        }
    }
}