type Kind = {
  voornaam: string;
  achternaam: string;
  leeftijd: number;
  geslacht: string;
  anekdote: string;
}

export type Inschrijving = {
  naam: string;
  email: string;
  kindOpSchool: boolean;
  lidVanClub: boolean;
  gratisLidmaatschap?: boolean;
  adres?: string;
  telefoon?: string;
  aantalPersonen: number;
  kinderen: Kind[];
  vrijwilliger: string;
  commentaar: string;
  privacyverklaring: boolean;
}