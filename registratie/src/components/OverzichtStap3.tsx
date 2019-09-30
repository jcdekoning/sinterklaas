import React from 'react';
import { Vrijwilliger } from '../types/form';
import styles from './OverzichtStap.module.css';
import { singularOrPlural } from '../utils/text';

const getVrijwilligerText = (keuze: Vrijwilliger, aantalKinderen: number) => {
  switch (keuze) {
    case 'uur':
      return 'Ja, voor 1 uur';
    case 'dagdeel':
      return `Ja, voor een dagdeel (ochtend- of middagsessie) waar mijn ${singularOrPlural(aantalKinderen, 'kind', 'kinderen')} bij aanwezig ${singularOrPlural(aantalKinderen, 'is', 'zijn')}`
    case 'dagdeelzonderkind':
      return `Ja, voor een dagdeel waar mijn ${singularOrPlural(aantalKinderen, 'kind', 'kinderen')} NIET bij aanwezig ${singularOrPlural(aantalKinderen, 'is', 'zijn')}`;
    case 'dag':
      return 'Ja, voor de gehele dag'
    default:
      return 'Nee'

  }
}

type OverzichtStap3Props = {
  vrijwilliger: Vrijwilliger;
  aantalKinderen: number;
}

const OverzichtStap3 = (props: OverzichtStap3Props) => {
  return <div className={styles.overzicht}>
    <h2>Opgeven als vrijwilliger</h2>
    <ul>
      <li className={styles.label}>Wilt u zich aanmelden als vrijwilliger?</li>
      <li>{getVrijwilligerText(props.vrijwilliger, props.aantalKinderen)}</li>
    </ul>
  </div>
}

export default OverzichtStap3;