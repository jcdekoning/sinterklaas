
namespace Sinterklaas.Api.Models 
{
    public class KindViewModel {
      public string Voornaam { get; set; }
      public string Achternaam { get; set; }
      public int Leeftijd { get; set; }
      public string Geslacht { get; set; }
      public string Eten { get; set; }
      public string Speelgoed { get; set; }
      public string Hobby { get; set; }
      public string RuimteVoorVerbetering { get; set; }
      public string VraagSintEnPiet { get; set; }
    }

  public class InschrijvingViewModel {
    public string Naam { get; set; }
    public string Email { get; set; }
    public int AantalPersonen { get; set; }
    public bool KindOpSchool { get; set; }
    public bool LidVanClub { get; set; }
    public bool GratisLidmaatschap {get; set;}
    public string Straatnaam {get; set;}
    public string Postcode {get; set;}
    public string Plaats {get; set;}
    public string Telefoon {get; set;}
    public KindViewModel[] Kinderen { get; set; }
    public string Commentaar { get; set; }
    public bool Privacyverklaring { get; set; }
  }
}