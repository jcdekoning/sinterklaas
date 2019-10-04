using Newtonsoft.Json;

namespace Sinterklaas.Api.Models 
{

  public class LidmaatschapEmailViewModel {
    [JsonProperty("naam")]
    public string Naam {get; set;}
    [JsonProperty("email")]
    public string Email {get;set;}
    [JsonProperty("adres")]
    public string Adres {get; set;}
    [JsonProperty("telefoon")]
    public string Telefoon {get; set;}
    [JsonProperty("gratisLidmaatschap")]
    public bool GratisLidmaatschap {get; set;}
  }
}