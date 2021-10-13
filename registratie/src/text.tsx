import React from 'react';
import { singularOrPlural } from './utils/text';

const longDateEvent = 'zaterdag 27 november';

export default {
  labelYes: 'Ja',
  labelNo: 'Nee',
  buttonBack: 'Terug',
  buttonNext: 'Verder',
  buttonPayment: 'Naar betalen',
  buttonWait: 'Een ogenblik geduld',
  buttonStart: 'Begin aanmelding',
  submitError: (error: string) => <p>Er is iets mis {error}</p>,
  formTitle: 'Inschrijving Sinterklaas',
  header: {
    title: 'Sinterklaas 2021',
    subheader: 'Nederlandse club Oslo - NTC het Noorderlicht',
  },
  intro: {
    title: 'Hoe werkt het inschrijven?',
    description: (
      <>
        <p>
          Groot nieuws! Ook dit jaar vieren we de verjaardag van Sinterklaas! We
          doen het dit wel in een iets andere vorm, namelijk digitaal via Zoom.
          Op {longDateEvent} zijn alle kinderen (0-10 jaar) van de Nederlandse
          Club Oslo en de Nederlandse school NTC Het Noorderlicht van harte
          welkom om deze feestelijke gebeurtenis mee te vieren.
        </p>
        <p>
          Via dit formulier kunnen ouders/verzorgers hun kind aanmelden voor het
          Sinterklaasfeest.
        </p>
      </>
    ),
    stap1: (
      <>
        <p>
          In de eerste stap wordt u om wat algemene gegevens gevraagd. In deze
          stap vragen wij ook naar uw adresgegevens. Deze gegevens zijn
          noodzakelijk voor de verzending van het cadeautje en het snoepgoed.
        </p>
        <p>
          Ook geeft u hier aan hoeveel kinderen (maximaal 5) u wilt inschrijven.
        </p>
      </>
    ),
    stap2:
      'Per kind (0-10 jaar) wordt gevraagd om de gegevens in te vullen voor in het grote boek van Sinterklaas.',
    stap3:
      'Het Sinterklaasfeest valt of staat met de hulp van vrijwilligers. In deze stap vragen wij of we ook op uw hulp kunnen rekenen.',
    stap4:
      'De ingevulde informatie uit de voorgaande stappen wordt hier ter controle getoond. Het totaal entreebedrag wordt hier ook getoond.',
    stap5:
      'Nadat u de inschrijving hebt gecontroleerd gaat u over tot betaling met behulp van uw bankpas/creditcard. De betaling zelf wordt afgehandeld door een externe partij. Uw betaalgegevens worden daarbij met de grootst mogelijke zorg behandeld en worden niet opgeslagen bij de Nederlandse Club Oslo',
  },
  stap1: {
    title: 'Algemene gegevens',
    naam: {
      label: 'Uw naam',
      description: 'Vul uw voornaam en achternaam in',
      error: 'Vul uw naam in',
    },
    email: {
      label: 'Uw emailadres',
      description:
        'We gebruiken uw emailadres voor verdere berichtgeving met betrekking tot het Sinterklaasfeest.',
      error: {
        required: 'Vul uw emailadres in',
        invalid: 'Het formaat van het ingevulde emailadres is ongeldig',
      },
    },
    kindOpSchool: {
      label: 'Heeft u kinderen op de NTC Het Noorderlicht?',
      error: 'Maak een keuze',
    },
    lidVanClub: {
      label: 'Bent u lid van de Nederlandse Club Oslo?',
      error: 'Maak een keuze',
    },
    gratisLidmaatschap: {
      label: 'Wilt u lid worden van de Nederlandse Club Oslo?',
      description: (
        <>
          <p>
            Omdat u een of meerdere kinderen op de NTC Het Noorderlicht heeft,
            is een lidmaatschap van de Nederlandse Club Oslo geen vereiste om
            deel te nemen aan het Sinterklaasfeest. De Nederlandse Club Oslo
            biedt u wel een gratis lidmaatschap aan tot eind 2020. Het
            lidmaatschap wordt daarna automatisch verlengd.
          </p>
          <p>Wilt u van dit aanbod gebruik maken?</p>
        </>
      ),
      error: 'Maak een keuze',
    },
    lidmaatschap: {
      label: 'Lidmaatschap Nederlandse Club Oslo',
      descriptionGratis:
        'U geeft aan gebruikt te willen maken van het gratis lidmaatschap tot eind 2002.',
      descriptionVerplicht:
        'Omdat u geen kinderen heeft op de NTC Het Noorderlicht is een lidmaatschap van de Nederlandse Club Olso een vereiste om deel te nemen aan het Sinterklaasfeest. Het lidmaatschap t/m eind 2020 bedraagt 175 nok.',
    },
    adresgegevens: {
      title: 'Adresgegevens',
      description:
        'Uw adresgegevens en telefoonnummer zijn noodzakelijk voor verzending van het cadeautje en het snoepgoed.',
    },
    straatnaam: {
      label: 'Straatnaam met huisnummer',
      error: 'Vul uw straatnaam en huisnummer in',
    },
    postcode: {
      label: 'Postcode',
      error: 'Vul uw postcode in',
    },
    plaats: {
      label: 'Plaatsnaam',
      error: 'Vul uw plaats in',
    },
    telefoon: {
      label: 'Uw telefoonnummer',
      description:
        'Uw telefoonnummer gebruiken we enkel als directe communicatie vereist is, bijvoorbeeld voor de verzending van het cadeautje en het snoepgoed',
      error: 'Vul uw telefoonnummer in',
    },
    deelnemers: {
      title: 'Wie komen er naar het Digitale Sinterklaasfeest?',
      description:
        'Geef hieronder aan wie er mee komen naar het Sinterklaasfeest.',
    },
    aantalKinderen: {
      label: 'Aantal kinderen tussen de 0 en 10 jaar.',
      description:
        'Alle kinderen (0-10 jaar) mogen op audiëntie en ontvangen een cadeautje van Sinterklaas. Daarnaast zijn er verschillende gezellige Sinterklaasactiviteiten.',
      error: {
        required: 'Vul het aantal kinderen in',
        min: 'Minimaal aantal kinderen moet 1 zijn',
        max:
          'Er kunnen maximaal 5 kinderen worden ingeschreven. Wilt u meer kinderen aanmelden neem dan contact op via sinterklaas@nederlandsecluboslo.nl',
      },
    },
    aantalPersonen: {
      label: 'Aantal volwassenen (inclusief kinderen boven de 10 jaar)',
      description:
        'Per gezin hebben twee personen (volwassenen en kinderen boven de 10 jaar) gratis toegang tot het feest. Voor elke extra persoon boven vragen we een vergoeding.',
      error: {
        required: 'Vul het aantal volwassenen/kinderen boven de 10 jaar in',
        min: 'Minimaal aantal personen moet 1 zijn',
        max:
          'Er kunnen maximaal 10 personen mee. Wilt u meer personen meenemen, neem dan contact op via sinterklaas@nederlandsecluboslo.nl',
      },
    },
  },
  stap2: {
    title: 'Gegevens kinderen',
    gegevensKind: 'Gegevens kind',
    roepnaamKind: {
      label: 'Roepnaam kind',
      error: 'Vul de roepnaam van uw kind in',
    },
    achternaamKind: {
      label: 'Achternaam kind',
      error: 'Vul de achternaam van uw kind in',
    },
    leeftijdKind: {
      label: 'Leeftijd kind',
      error: {
        required: 'Vul de leeftijd van uw kind in',
        min: 'Leeftijd kan niet negatief zijn',
        max: 'De maximale leeftijd is 10 jaar',
      },
    },
    geslachtKind: {
      label: 'Geslacht kind',
      error: 'Kies een geslacht',
      optionJongen: 'Jongen',
      optionMeisje: 'Meisje',
    },
    anekdoteKind: {
      label: 'Anekdote kind',
      description:
        'Schrijf iets waar uw kind zich in kan herkennen. Dit kan van alles zijn, bijvoorbeeld favoriete eten, huisdieren of eventuele hobbies.',
      error: 'Vul een anekdote in',
    },
  },
  stap3: {
    title: 'Opgeven als vrijwilliger',
    description: (aantalKinderen: number) => (
      <>
        <p>
          We hebben uw hulp hard nodig op {longDateEvent}, want zonder
          vrijwilligers is het onmogelijk om het Sinterklaasfeest te
          organiseren. We hopen dat we op uw inzet kunnen rekenen!
          <br />
          <br />
        </p>

        <p>
          Let op! Bij het inplannen van de vrijwilligers, ook voor degene die
          een dagdeel of de gehele dag willen meehelpen, wordt rekening gehouden
          met de audiëntie van uw{' '}
          {singularOrPlural(aantalKinderen, 'kind', 'kinderen')} aan
          Sinterklaas. U kunt deze samen met uw{' '}
          {singularOrPlural(aantalKinderen, 'kind', 'kinderen')} bezoeken. Dit
          geldt ook voor het ontvangst van Sinterklaas.
        </p>
      </>
    ),
    vrijwilliger: {
      label: 'Wilt u zich aanmelden als vrijwilliger?',
      optionUur: 'Ja, voor 1 uur',
      optionDagdeel: 'Ja, voor een dagdeel (ochtend- of middagsessie)',
      optionDag: 'Ja, voor de gehele dag',
      optionNee: 'Nee',
      error: 'Maak een keuze',
    },
  },
  stap4: {
    title: 'Inschrijving controleren',
    privacyverklaring: {
      title: 'Privacyverklaring',
      description: (
        <p>
          Bij aanmelding worden uw persoonsgegevens en de gegevens van uw
          kind/kinderen bewaard door de Nederlandse Club Oslo. Op{' '}
          <a
            href="https://nederlandsecluboslo.nl/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://nederlandsecluboslo.nl/privacy
          </a>{' '}
          kunt u lezen waarom dit noodzakelijk is en hoe wij met deze gegevens
          omgaan.
        </p>
      ),
      label: 'Ik heb de privacyverklaring gelezen',
      error: 'Accepteer de privacyverklaring',
    },
    commentaar: {
      label: 'Heeft u nog overige vragen en/of opmerkingen?',
    },
  },
  stap5: {
    title: 'Betaling',
  },
  overzichtEntreegeld: {
    title: 'Overzicht entreegeld',
    description:
      'Hier vindt u een overzicht van de totale kosten voor de inschrijving op basis van de keuzes die u hierboven heeft gemaakt.',
    aantalInschrijvingen: (aantalKinderen: number) =>
      `${aantalKinderen} ${singularOrPlural(
        aantalKinderen,
        'inschrijving',
        'inschrijvingen'
      )} x 100 NOK`,
    aantalExtraPersonen: (aantalExtraPersonen: number) =>
      `${aantalExtraPersonen} extra ${singularOrPlural(
        aantalExtraPersonen,
        'persoon',
        'personen'
      )} x 50 NOK`,
    lidmaatschap: 'Lidmaatschap t/m eind 2021',
    totaal: 'Totaal',
    valuta: 'NOK',
  },
  success: {
    title: 'Betaling ontvangen',
    description: (
      <>
        <p>
          Bedankt voor uw inschrijving en betaling. U ontvangt een bevestiging
          van uw inschrijving per email.
        </p>
        <p>
          Rond 9 november ontvangt u informatie met betrekking tot de
          groepsindeling. Daarnaast ontvangt u ook meer informatie over het
          gebruik van Zoom.
        </p>
        <p>
          Mocht u vragen hebben dan kunt u contact opnemen via{' '}
          <a href="mailto:sinterklaas@nederlandsecluboslo.nl">
            sinterklaas@nederlandsecluboslo.nl
          </a>
        </p>
        <p>
          We zien jullie graag, via de computer, op {longDateEvent} om er
          gezamenlijk een onvergetelijke gebeurtenis van te maken!
        </p>
        <p>Met vriendelijke groet,</p>
        <p>
          De Hulppieten van de Nederlandse Club Oslo en de Nederlandse School
          NTC Het Noorderlicht
        </p>
      </>
    ),
  },
};
