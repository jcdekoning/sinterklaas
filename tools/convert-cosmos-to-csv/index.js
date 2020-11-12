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
            {id: 'Straatnaam', title: 'Straatnaam'},
            {id: 'Postcode', title: 'Postcode'},
            {id: 'Plaats', title: 'Plaats'},
            {id: 'Telefoon', title: 'Telefoon'},
            {id: 'Lid', title: 'Bent u lid van de Nederlandse Club Oslo?'},
            {id: 'KindOpSchool', title: 'Heeft u kinderen op de NTC Het Noorderlicht?'},
            {id: 'AantalKinderen', title: 'Met hoeveel kinderen komt u?'},
            {id: 'RoepnaamKind', title: 'Roepnaam kind'},
            {id: 'AchternaamKind', title: 'Achternaam kind'},
            {id: 'LeeftijdKind', title: 'Leeftijd kind'},
            {id: 'GeslachtKind', title: 'Geslacht kind'},
            {id: 'AnekdoteKind', title: 'Anekdote kind'},
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
        Straatnaam: inschrijving.Straatnaam,
        Postcode: inschrijving.Postcode,
        Plaats: inschrijving.Plaats,
        Telefoon: inschrijving.Telefoon,
        Lid: inschrijving.LidVanClub,
        KindOpSchool: inschrijving.KindOpSchool,
        AantalKinderen: inschrijving.Kinderen.length,
        RoepnaamKind: kind.Voornaam,
        AchternaamKind: kind.Achternaam,
        LeeftijdKind: kind.Leeftijd,
        GeslachtKind: kind.Geslacht,
        AnekdoteKind: kind.Anekdote,
        Commentaar: index == 0 ? inschrijving.Commentaar : ''
    }
}

