import React from 'react';
import { Stap1FormData } from '../types/form';
import styles from './OverzichtStap.module.css';
import text from '../text';

const OverzichtStap1 = (props: Stap1FormData) => {
  const kindOpSchoolAsBool = props.kindOpSchool === 'true';
  const lidVanClubAsBool = props.lidVanClub === 'true';
  const gratisLidmaatschapAsBool = props.gratisLidmaatschap === 'true';

  return (
    <div className={styles.overzicht}>
      <h2>{text.stap1.title}</h2>
      <ul>
        <li className={styles.label}>{text.stap1.naam.label}</li>
        <li>{props.naam}</li>
        <li className={styles.label}>{text.stap1.email.label}</li>
        <li>{props.email}</li>
        <li className={styles.label}>{text.stap1.telefoon.label}</li>
        <li>{props.telefoon}</li>
        <li className={styles.label}>{text.stap1.kindOpSchool.label}</li>
        <li>{kindOpSchoolAsBool ? text.labelYes : text.labelNo}</li>
        <li className={styles.label}>{text.stap1.lidVanClub.label}</li>
        <li>{lidVanClubAsBool ? text.labelYes : text.labelNo}</li>
        <li className={styles.label}>{text.stap1.aantalKinderen.label}</li>
        <li>{props.aantalKinderen}</li>
        <li className={styles.label}>{text.stap1.aantalPersonen.label}</li>
        <li>{props.aantalPersonen}</li>
      </ul>
      {((!kindOpSchoolAsBool && !lidVanClubAsBool) || gratisLidmaatschapAsBool) && <>
      <p>{!kindOpSchoolAsBool && !lidVanClubAsBool ?
        "Omdat u geen kinderen heeft op de NTC Het Noorderlicht is een lidmaatschap een vereiste om deel te nemen aan het Sinterklaasfeest." :
        "U wilt gebruik maken van het van het gratis lidmaatschap tot eind 2021. Daarna wordt het lidmaatschap automatisch verlengd."}</p>
      <ul>
      <li className={styles.label}>{text.stap1.straatnaam.label}</li>
        <li>{props.straatnaam}</li>
        <li className={styles.label}>{text.stap1.postcode.label}</li>
        <li>{props.postcode}</li>
        <li className={styles.label}>{text.stap1.plaats.label}</li>
        <li>{props.plaats}</li>
      </ul>
    </>}
    </div>
  );
};

export default OverzichtStap1;
