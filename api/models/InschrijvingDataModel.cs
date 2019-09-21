
using System;

namespace Sinterklaas.Api.Models 
{
    public class KindDataModel {
      public string Voornaam { get; set; }
      public string Achternaam { get; set; }
      public int Leeftijd { get; set; }
      public string Geslacht { get; set; }
      public string Anekdote { get; set; }
    }

  public class InschrijvingDataModel {
    public string Naam { get; set; }
    public string Email { get; set; }
    public int AantalPersonen { get; set; }
    public string Relatie { get; set; }
    public KindDataModel[] Kinderen { get; set; }
    public string Vrijwilliger { get; set; }
    public string Commentaar { get; set; }
    public bool Privacyverklaring { get; set; }
    public string SessionId { get; set; }
    public string EventId = "Sinterklaas";
    public long Bedrag {get; set;}
    public bool Betaald {get; set;}
    public DateTime? BetaaldOpUtc {get; set;}
    public string id {get; set; }
    public string _self {get; set;}
  }
}