import React from 'react';
import styles from './OverzichtEntreegeld.module.css';
import text from '../text';

type OverzichtEntreegeldProps = {
  aantalKinderen: number;
  aantalPersonen: number;
  lidmaatschap: boolean;
  gratisLidmaatschap: boolean;
};

const bedragEntreegeld = 100;
const bedragLidmaatschap = 175;
const bedragExtraPersoon = 50;

const OverzichtEntreegeld = (props: OverzichtEntreegeldProps) => {
  const {
    aantalKinderen,
    aantalPersonen,
    lidmaatschap,
    gratisLidmaatschap,
  } = props;

  const aantalExtraPersonen = Math.max(aantalPersonen - 2, 0);

  return (
    <div className={styles.overzicht}>
      <h2>{text.overzichtEntreegeld.title}</h2>
      <p>{text.overzichtEntreegeld.description}</p>
      <ul>
        {aantalKinderen > 0 && (
          <li>
            <div>
              {text.overzichtEntreegeld.aantalInschrijvingen(aantalKinderen)}
            </div>
            <div>
              {aantalKinderen * bedragEntreegeld}{' '}
              {text.overzichtEntreegeld.valuta}
            </div>
          </li>
        )}
        {aantalExtraPersonen > 0 && (
          <li>
            <div>
              {text.overzichtEntreegeld.aantalExtraPersonen(
                aantalExtraPersonen
              )}
            </div>
            <div>
              {aantalExtraPersonen * bedragExtraPersoon}{' '}
              {text.overzichtEntreegeld.valuta}
            </div>
          </li>
        )}
        {lidmaatschap && (
          <li>
            <div>{text.overzichtEntreegeld.lidmaatschap}</div>
            <div>
              {gratisLidmaatschap ? 0 : bedragLidmaatschap}{' '}
              {text.overzichtEntreegeld.valuta}
            </div>
          </li>
        )}
        <li className={styles.totaal}>
          <div>{text.overzichtEntreegeld.totaal}</div>
          <div>
            {Math.max(aantalKinderen, 0) * bedragEntreegeld +
              aantalExtraPersonen * bedragExtraPersoon +
              (lidmaatschap && !gratisLidmaatschap
                ? bedragLidmaatschap
                : 0)}{' '}
            {text.overzichtEntreegeld.valuta}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OverzichtEntreegeld;
