using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using SendGrid;
using SendGrid.Helpers.Mail;

public class SendGridMailService : IMailService
{
    private readonly ILogger _log;
    private readonly SendGridClient _client;

    public SendGridMailService(string apiKey, ILogger log)
    {
        _client = new SendGridClient(apiKey);
        _log = log;
    }

    public async Task SendMailAsync(string fromName, string fromEmail, string toName, string toEmail, string bcc, string subject, string templateId, object model)
    {
        var message = new SendGridMessage();
        message.SetFrom(fromEmail, fromName);
        message.AddTo(toEmail, toName);
        message.AddBcc(bcc);
        
        message.SetTemplateId(templateId);
        message.SetTemplateData(model);

        var response = await _client.SendEmailAsync(message);
        _log.LogInformation($"Email sent. Statuscode {response.StatusCode}");
    }
}