namespace Sinterklaas.Api;

public class ApiSettings
{
    public StripeSettings Stripe { get; set; }
    public string FrontendUrl { get; set; }
    public EmailSettings ConfirmEmail { get; set; }
    public string MailgunApiKey { get; set; }
    public EmailSettings MembershipEmail { get; set; }
}

public class StripeSettings
{
    public string SecretKey { get; set; }
    public string WebhookSecret { get; set; }
}

public class EmailSettings
{
    public string FromName { get; set; }
    public string FromEmail { get; set; }
    public string Bcc { get; set; }
    public string Subject { get; set; }
    public string TemplateId { get; set; }
    public string ToName { get; set; }
    public string ToEmail { get; set; }
}