type Kind = {
  voornaam: string;
  achternaam: string;
  leeftijd: number;
  geslacht: string;
  eten: string;
  speelgoed: string;
  hobby: string;
  ruimtevoorverbetering: string;
  vraagsintenpiet: string;
};

export type Inschrijving = {
  naam: string;
  email: string;
  kindOpSchool: boolean;
  lidVanClub: boolean;
  gratisLidmaatschap?: boolean;
  straatnaam: string;
  postcode: string;
  plaats: string;
  telefoon: string;
  kinderen: Kind[];
  commentaar: string;
  privacyverklaring: boolean;
  aantalPersonen: number;
};
