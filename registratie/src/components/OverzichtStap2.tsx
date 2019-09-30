import React from 'react';
import { Stap2FormData } from '../types/form';
import styles from './OverzichtStap.module.css';

type OverzichtStap2Props = {
  kinderen: Stap2FormData[]
}
const OverzichtStap2 = (props: OverzichtStap2Props) => {
  return <>
    {props.kinderen.map((kind, index) => {
      return (<div key={index} className={styles.overzicht}>
        <h2>Gegevens kinderen - {kind.voornaam} {kind.achternaam}</h2>
        <ul>
          <li className={styles.label}>Voornaam</li>
          <li>{kind.voornaam}</li>
          <li className={styles.label}>Achternaam</li>
          <li>{kind.achternaam}</li>
          <li className={styles.label}>Leeftijd</li>
          <li>{kind.leeftijd} jaar</li>
          <li className={styles.label}>Geslacht</li>
          <li>{kind.geslacht}</li>
          <li className={styles.label}>Anekdote</li>
          <li>{kind.anekdote}</li>
        </ul>
      </div>)
    })}
  </>
}

export default OverzichtStap2;