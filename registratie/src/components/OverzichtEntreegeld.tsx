import React from 'react';
import styles from './OverzichtEntreegeld.module.css';
import text from '../text';

type OverzichtEntreegeldProps = {
  aantalKinderen: number;
  aantalPersonen: number;
  lidmaatschap: boolean;
  gratisLidmaatschap: boolean;
}

const OverzichtEntreegeld = (props: OverzichtEntreegeldProps) => {
  const { aantalKinderen, aantalPersonen, lidmaatschap, gratisLidmaatschap } = props;

  const aantalExtraPersonen = Math.max(aantalPersonen - 2, 0);

  return <div className={styles.overzicht}><h2>{text.overzichtEntreegeld.title}</h2>
    <p>{text.overzichtEntreegeld.description}</p>
    <ul>
      {aantalKinderen > 0 && <li>
        <div>{text.overzichtEntreegeld.aantalInschrijvingen(aantalKinderen)}</div>
        <div>{aantalKinderen * 150} {text.overzichtEntreegeld.valuta}</div>
      </li>}
      {aantalExtraPersonen > 0 && <li>
        <div>{text.overzichtEntreegeld.aantalExtraPersonen(aantalExtraPersonen)}</div>
        <div>{aantalExtraPersonen * 50} {text.overzichtEntreegeld.valuta}</div>
      </li>}
      {lidmaatschap && <li>
        <div>{text.overzichtEntreegeld.lidmaatschap}</div>
        <div>{gratisLidmaatschap ? 0 : 175} {text.overzichtEntreegeld.valuta}</div>
      </li>}
      <li className={styles.totaal}>
        <div>{text.overzichtEntreegeld.totaal}</div>
        <div>{(Math.max(aantalKinderen, 0) * 150) + (aantalExtraPersonen * 50) + ((lidmaatschap && !gratisLidmaatschap) ? 175 : 0)} {text.overzichtEntreegeld.valuta}</div>
      </li>
    </ul></div>;
}

export default OverzichtEntreegeld;