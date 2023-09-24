const { CosmosClient } = require("@azure/cosmos");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const config = require("./config.js");

const endpoint = config.cosmos.endpoint;
const key = config.cosmos.key;
const client = new CosmosClient({ endpoint, key });

async function main() {
  
    const csvWriter = createCsvWriter({
        path: 'output.csv',
        fieldDelimiter: ';',
        alwaysQuote: true,
        header: [
            {id: 'Naam', title: 'Uw naam'},
            {id: 'Email', title: 'Uw email'},
            {id: 'Telefoon', title: 'Telefoon'},
            {id: 'Lid', title: 'Bent u lid van de Nederlandse Club Oslo?'},
            {id: 'KindOpSchool', title: 'Heeft u kinderen op de NTC Het Noorderlicht?'},
            {id: 'AantalKinderen', title: 'Met hoeveel kinderen komt u?'},
            {id: 'AantalPersonen', title: 'Aantal volwassenen'},
            {id: 'RoepnaamKind', title: 'Roepnaam kind'},
            {id: 'AchternaamKind', title: 'Achternaam kind'},
            {id: 'LeeftijdKind', title: 'Leeftijd kind'},
            {id: 'GeslachtKind', title: 'Geslacht kind'},
            {id: 'Eten', title: 'Wat is het favoriete eten van uw kind?'},
            {id: 'Speelgoed', title: 'Wat is het favoriete speelgoed van uw kind?'},
            {id: 'Hobby', title: 'Heeft uw kind een hobby?'},
            {id: 'RuimteVoorVerbetering', title: 'Waar moet nog op geoefend worden?'},
            {id: 'VraagSintEnPiet', title: 'Heeft uw kind nog een vraag voor Sint of Piet?'},
            {id: 'Commentaar', title: 'Commentaar'},
        ]
    });

    const { database } = await client.databases.createIfNotExists({ id: "sinterklaas" });
    const { container } = await database.containers.createIfNotExists({ id: "inschrijvingen" });
    const { resources } = await container.items
    .query({
        query: "SELECT * from c WHERE c.Betaald = true"
    })
    .fetchAll();

    const records = new Array();
    resources.forEach(inschrijving => inschrijving.Kinderen.forEach((kind, index) => records.push(MapInschrijvingVoorKind(inschrijving, kind, index))));
    await csvWriter.writeRecords(records)  
}

main().catch((error) => {
  console.error(error);
});

function MapInschrijvingVoorKind(inschrijving, kind, index){
    return {
        Naam: inschrijving.Naam,
        Email: inschrijving.Email,
        Telefoon: inschrijving.Telefoon,
        Lid: inschrijving.LidVanClub,
        KindOpSchool: inschrijving.KindOpSchool,
        AantalKinderen: inschrijving.Kinderen.length,
        AantalPersonen: inschrijving.AantalPersonen,
        RoepnaamKind: kind.Voornaam,
        AchternaamKind: kind.Achternaam,
        LeeftijdKind: kind.Leeftijd,
        GeslachtKind: kind.Geslacht,
        Eten: kind.Eten,
        Speelgoed: kind.Speelgoed,
        Hobby: kind.Hobby,
        RuimteVoorVerbetering: kind.RuimteVoorVerbetering,
        VraagSintEnPiet: kind.VraagSintEnPiet,
        Commentaar: index == 0 ? inschrijving.Commentaar : ''
    }
}

