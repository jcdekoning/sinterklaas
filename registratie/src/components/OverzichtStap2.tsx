import React from 'react';
import { Stap2FormData } from '../types/form';
import styles from './OverzichtStap.module.css';
import text from '../text';

type OverzichtStap2Props = {
  kinderen: Stap2FormData[]
}
const OverzichtStap2 = (props: OverzichtStap2Props) => {
  return <>
    {props.kinderen.map((kind, index) => {
      return (<div key={index} className={styles.overzicht}>
        <h2>{kind.voornaam} {kind.achternaam}</h2>
        <ul>
          <li className={styles.label}>{text.stap2.roepnaamKind}</li>
          <li>{kind.voornaam}</li>
          <li className={styles.label}>{text.stap2.achternaamKind}</li>
          <li>{kind.achternaam}</li>
          <li className={styles.label}>{text.stap2.leeftijdKind}</li>
          <li>{kind.leeftijd} jaar</li>
          <li className={styles.label}>{text.stap2.geslachtKind}</li>
          <li>{kind.geslacht}</li>
          <li className={styles.label}>{text.stap2.anekdoteKind}</li>
          <li>{kind.anekdote}</li>
        </ul>
      </div>)
    })}
  </>
}

export default OverzichtStap2;