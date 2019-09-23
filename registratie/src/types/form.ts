export type Stap1FormData = {
  naam: string;
  email: string;
  kindOpSchool: boolean;
  lidVanClub: boolean;
  aantalKinderen: number;
  aantalKinderen10Plus: number;
  aantalVolwassenen: number;
}

export type Stap2FormData = {
  voornaam: string;
  achternaam: string;
  leeftijd: number;
  geslacht: string;
  anekdote: string;
}

export type Stap3FormData = {
  vrijwilliger: string;
}

export type Stap4FormData = {
  commentaar: string;
  privacyverklaring: string;
}

export type FormState = {
  stap1?: Stap1FormData,
  stap2?: Stap2FormData[],
  stap3?: Stap3FormData
  stap4?: Stap4FormData
}