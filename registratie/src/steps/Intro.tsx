import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Intro.module.css';

import StepSection from '../components/StepSection';
import StepFooter from '../components/StepFooter';

import { ReactComponent as SinterklaasSvg } from '../images/sinterklaas.svg';
import { ReactComponent as PaardSvg } from '../images/paard.svg';
import { ReactComponent as BoekSvg } from '../images/boek.svg';
import { ReactComponent as KlompSvg } from '../images/klomp.svg';
import { ReactComponent as CadeauSvg } from '../images/cadeau.svg';
import text from '../text';

const Intro = () => {
  return <>
    <header>
      <div className={styles.header}>
        <h1>{text.formTitle}</h1>
        <p>{text.intro.description}</p>
      </div>
    </header>
    <StepSection>
      <h2>{text.intro.title}</h2>
      <ul className={styles.steps}>
        <li>
          <div>
            <SinterklaasSvg />
          </div>
          <div>
            <h3>{text.stap1.title}</h3>
            <p>{text.intro.stap1} </p>
          </div>
        </li>
        <li>
          <div>
            <BoekSvg />
          </div>
          <div>
            <h3>{text.stap2.title}</h3>
            <p>{text.intro.stap2}</p>
          </div>
        </li>
        <li>
          <div>
            <PaardSvg />
          </div>
          <div>
            <h3>{text.stap3.title}</h3>
            <p>{text.intro.stap3}</p>
          </div>
        </li>
        <li>
          <div>
            <KlompSvg />
          </div>
          <div>
            <h3>{text.stap4.title}</h3>
            <p>{text.intro.stap4} </p>
          </div>
        </li>
        <li>
          <div>
            <CadeauSvg />
          </div>
          <div>
            <h3>{text.stap5.title}</h3>
            <p>{text.intro.stap5} </p>
          </div>
        </li>
      </ul>
    </StepSection>
    <StepFooter>
      <div className={styles.footer}>
        <Link to="/stap1">{text.buttonStart}</Link>
      </div>
    </StepFooter>
  </>
}

export default Intro;