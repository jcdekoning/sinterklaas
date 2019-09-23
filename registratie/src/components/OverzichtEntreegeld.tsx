import React from 'react';

type OverzichtEntreegeldProps = {
  aantalKinderen: number;
  aantalPersonen: number;
  lidmaatschap: boolean;
  gratisLidmaatschap: boolean;
}

const OverzichtEntreegeld = (props: OverzichtEntreegeldProps) => {
  const { aantalKinderen, aantalPersonen, lidmaatschap, gratisLidmaatschap } = props;

  const aantalExtraPersonen = Math.max(aantalPersonen - 2, 0);

  return <><h2>Overzicht entreegeld</h2>
    <p>Hier vindt u een overzicht van de totale kosten voor de inschrijving op basis van de keuzes die u hierboven heeft gemaakt.</p>
    <ul>
      {aantalKinderen > 0 && <li>
        <div>{aantalKinderen} {aantalKinderen === 1 ? 'inschrijving' : 'inschrijvingen'} x 150 NOK</div>
        <div>{aantalKinderen * 150} NOK</div>
      </li>}
      {aantalExtraPersonen > 0 && <li>
        <div>{aantalExtraPersonen} extra bijdrage voor personen x 50 NOK</div>
        <div>{aantalExtraPersonen * 50} NOK</div>
      </li>}
      {lidmaatschap && <li>
        <div>Lidmaatschap t/m eind 2019</div>
        <div>{gratisLidmaatschap ? 0 : 175} NOK</div>
      </li>}
      <li>
        <div>Totaal</div>
        <div>{(Math.max(aantalKinderen, 0) * 150) + (aantalExtraPersonen * 50) + ((lidmaatschap && !gratisLidmaatschap) ? 175 : 0)}</div>
      </li>
    </ul></>;
}

export default OverzichtEntreegeld;