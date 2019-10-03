import React from 'react';
import { Vrijwilliger } from '../types/form';
import styles from './OverzichtStap.module.css';
import text from '../text';

const getVrijwilligerText = (keuze: Vrijwilliger, aantalKinderen: number) => {
  switch (keuze) {
    case 'uur':
      return text.stap3.vrijwilliger.optionUur;
    case 'dagdeel':
      return text.stap3.vrijwilliger.optionDagdeel(aantalKinderen);
    case 'dagdeelzonderkind':
      return text.stap3.vrijwilliger.optionDagdeelZonderKind(aantalKinderen);
    case 'dag':
      return text.stap3.vrijwilliger.optionDag;
    default:
      return text.stap3.vrijwilliger.optionNee

  }
}

type OverzichtStap3Props = {
  vrijwilliger: Vrijwilliger;
  aantalKinderen: number;
}

const OverzichtStap3 = (props: OverzichtStap3Props) => {
  return <div className={styles.overzicht}>
    <h2>{text.stap3.title}</h2>
    <ul>
      <li className={styles.label}>{text.stap3.vrijwilliger.label}</li>
      <li>{getVrijwilligerText(props.vrijwilliger, props.aantalKinderen)}</li>
    </ul>
  </div>
}

export default OverzichtStap3;