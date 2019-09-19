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
  aantalPersonen: number;
  relatie: string;
  kinderen: Kind[];
  vrijwilliger: string;
  commentaar: string;
  privacyverklaring: boolean;
}