namespace Sinterklaas.Api;

public class ApiSettings
{
    public StripeSettings Stripe { get; set; }
    public string FrontendUrl { get; set; }
}

public class StripeSettings
{
    public string SecretKey { get; set; }
}