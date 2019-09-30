import React from 'react';
import { Stap1FormData } from '../types/form';
import styles from './OverzichtStap.module.css';

const OverzichtStap1 = (props: Stap1FormData) => {
  return <div className={styles.overzicht}>
    <h2>Algemene gegevens</h2>
    <ul>
      <li className={styles.label}>Uw naam</li>
      <li>{props.naam}</li>
      <li className={styles.label}>Uw emailadres</li>
      <li>{props.email}</li>
      <li className={styles.label}>Heeft uw kinderen op de NTC Het Noorderlicht?</li>
      <li>{props.kindOpSchool ? "Ja" : "Nee"}</li>
      <li className={styles.label}>Bent u lid van de Nederlandse Club Oslo?</li>
      <li>{props.lidVanClub ? "Ja" : "Nee"}</li>
      <li className={styles.label}>Aantal kinderen tussen de 0 en 10 jaar</li>
      <li>{props.aantalKinderen}</li>
      <li className={styles.label}>Aantal kinderen boven de 10 jaar/volwassenen</li>
      <li>{props.aantalPersonen}</li>
    </ul>
    {((!props.kindOpSchool && !props.lidVanClub) || props.gratisLidmaatschap) && <>
      <p>{!props.kindOpSchool && !props.lidVanClub ?
        "Omdat u geen kinderen heeft op de NTC Het Noorderlicht is een lidmaatschap een vereiste om deel te nemen aan het Sinterklaasfeest." :
        "U wilt gebruik maken van het van het gratis lidmaatschap tot eind 2019. Daarna wordt het lidmaatschap automatisch verlengd."}</p>
      <ul>
        <li className={styles.label}>Uw adres</li>
        <li>{props.adres}</li>
        <li className={styles.label}>Uw telefoonnummer</li>
        <li>{props.telefoon}</li>
      </ul>
    </>}
  </div>
}

export default OverzichtStap1;