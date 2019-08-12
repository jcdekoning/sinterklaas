const csv = require('csv-parser');
const fs = require('fs');

const headerMapping = [
  null,
  'naam',
  'email',
  'aantalPersonen',
  'relatieClubOfSchool',
  'aantalKinderen',
  'roepnaamKind4',
  'achternaamKind4',
  'leeftijdKind4',
  'geslachtKind4',
  'anekdoteKind4',
  'roepnaamKind3',
  'achternaamKind3',
  'leeftijdKind3',
  'geslachtKind3',
  'anekdoteKind3',
  'roepnaamKind2',
  'achternaamKind2',
  'leeftijdKind2',
  'geslachtKind2',
  'anekdoteKind2',
  'roepnaamKind1',
  'achternaamKind1',
  'leeftijdKind1',
  'geslachtKind1',
  'anekdoteKind1',
  'vrijwilliger',
  'vrijwilliger2',
  'vrijwilliger3',
  'commentaar'
]

const mapRelatieClubOfSchool = (relatie) => {
  if(relatie === "Ik ben lid van de Nederlandse Club Oslo (aanmelding kost 150 Nok per kind)"){
    return 'CLUB'
  }

  if(relatie === "Ik heb een kind op de NTC Het Noorderlicht (aanmelding kost 150 Nok per kind)"){
    return "SCHOOL";
  }

  return "GEEN";
}

const mapKind = (data, kindIndex) => {
  return {
    roepnaam: data[`roepnaamKind${kindIndex}`],
    achternaam: data[`achternaamKind${kindIndex}`],
    leeftijd: parseInt(data[`leeftijdKind${kindIndex}`]),
    geslacht: data[`geslachtKind${kindIndex}`].toUpperCase(),
    anekdote: data[`anekdoteKind${kindIndex}`]
  }
}

const mapVrijwilligerValue = (vrijwilligerValue) => {
  switch(vrijwilligerValue){
    case 'Ja, voor 1 uur':
      return 'UUR';
    case 'Ja, voor de gehele dag':
      return 'DAG';
    case 'Ja, ik meld mij aan als vrijwilliger voor het dagdeel waar mijn kind/kinderen NIET bij aanwezig is/zijn':
      return 'DAGDEELZONDERKIND';
    case 'Ja, voor een dagdeel (ochtend- of middagsessie)':
      return 'DAGDEEL';
    default:
      return 'NEE';
  }
}

const mapVrijwilliger = (vrijwilliger1, vrijwilliger2, vrijwilliger3) => {
  if(vrijwilliger1 != 'Nee'){
    return mapVrijwilligerValue(vrijwilliger1);
  }

  if(vrijwilliger2 != 'Nee'){
    return mapVrijwilligerValue(vrijwilliger2);
  }

  return mapVrijwilligerValue(vrijwilliger3);
}

const results = [];

fs.createReadStream('input.csv')
  .pipe(csv({
    separator: ';',
    mapHeaders: ({ header, index }) => {
        return headerMapping[index];
    }
  }))
  .on('data', (data) => {
    let aanmelding = {
      naam: data.naam.trim(),
      email: data.email.trim(),
      aantalPersonen: parseInt(data.aantalPersonen),
      relatieClubOfSchool: mapRelatieClubOfSchool(data.relatieClubOfSchool),
      kinderen: [],
      status: 'COMPLETE',
      vrijwilliger: mapVrijwilliger(data.vrijwilliger, data.vrijwilliger2, data.vrijwilliger3),
      commentaar: data.commentaar
    };

    let aantalKinderen = parseInt(data.aantalKinderen);
    for(let i = 1; i <= aantalKinderen; i++){
      aanmelding.kinderen.push(mapKind(data, i));
    }

    results.push(aanmelding);
  })
  .on('end', () => {
    let data = JSON.stringify(results, null, 2);
    fs.writeFileSync('output.json', data);
  });