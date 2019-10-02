export type Geslacht =
  | "Jongen"
  | "Meisje"

export type Stap1FormData = {
  naam: string;
  email: string;
  kindOpSchool: string;
  lidVanClub: string;
  aantalKinderen: number;
  aantalPersonen: number;
  gratisLidmaatschap?: string;
  adres?: string;
  telefoon?: string;
}

export type Stap2FormData = {
  voornaam: string;
  achternaam: string;
  leeftijd: number;
  geslacht: Geslacht;
  anekdote: string;
}

export type Vrijwilliger =
  | 'uur'
  | 'dagdeel'
  | 'dagdeelzonderkind'
  | 'dag'
  | 'nee'

export type Stap3FormData = {
  vrijwilliger: Vrijwilliger;
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