using System.Threading.Tasks;

public interface IMailService {

    Task SendMailAsync(string fromName, string fromEmail, string toName, string toEmail, string bcc, string subject, string templateId, object model);
}