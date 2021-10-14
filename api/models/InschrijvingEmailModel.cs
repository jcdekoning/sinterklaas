
using Newtonsoft.Json;

namespace Sinterklaas.Api.Models 
{

  public class KindEmailModel {
    [JsonProperty("roepnaam")]
    public string Roepnaam {get; set;}
    [JsonProperty("achternaam")]
    public string Achternaam {get;set;}
    [JsonProperty("leeftijd")]
    public int Leeftijd {get; set;}
    [JsonProperty("geslacht")]
    public string Geslacht {get; set;}
    [JsonProperty("eten")]
    public string Eten {get; set;}
    [JsonProperty("speelgoed")]
    public string Speelgoed {get; set;}
    [JsonProperty("hobby")]
    public string Hobby { get; set; }
    [JsonProperty("ruimtevoorverbetering")]
    public string RuimteVoorVerbetering { get; set; }
    [JsonProperty("vraagsintenpiet")]
    public string VraagSintEnPiet { get; set; }
  }

  public class VrijwilligerEmailModel {
    [JsonProperty("uur")]
    public bool Uur {get; set;}
    [JsonProperty("dagdeel")]
    public bool Dagdeel {get; set;}
    [JsonProperty("dagdeelzonderkind")]
    public bool DagdeelZonderKind {get; set;}
    [JsonProperty("dag")]
    public bool Dag {get; set;}
  }

  public class InschrijvingEmailModel {
    [JsonProperty("naam")]
    public string Naam {get; set;}
    [JsonProperty("email")]
    public string Email {get; set;}
    [JsonProperty("kindOpSchool")]
    public bool KindOpSchool {get; set;}
    [JsonProperty("lidVanClub")]
    public bool LidVanClub {get; set;}
    [JsonProperty("aantalPersonen")]
    public int AantalPersonen {get; set;}
    [JsonProperty("aantalKinderen")]
    public int AantalKinderen {get; set;}
    [JsonProperty("lidmaatschap")]
    public bool Lidmaatschap {get; set;}
    [JsonProperty("gratisLidmaatschap")]
    public bool GratisLidmaatschap {get; set;}
    [JsonProperty("straatnaam")]
    public string Straatnaam {get; set;}
    [JsonProperty("postcode")]
    public string Postcode {get; set;}
    [JsonProperty("plaats")]
    public string Plaats {get; set;}
    [JsonProperty("telefoon")]
    public string Telefoon {get; set;}

    [JsonProperty("kinderen")]
    public KindEmailModel[] Kinderen {get; set;}
     [JsonProperty("commentaar")]
     public string Commentaar {get; set;}
  }
}
