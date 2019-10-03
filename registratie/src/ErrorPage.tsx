import React from "react";
import StepHeader from "./components/StepHeader";
import StepSection from "./components/StepSection";

import { ReactComponent as CadeauSvg } from './images/cadeau.svg';
import StepFooter from "./components/StepFooter";
import { Link } from "react-router-dom";
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  return (<>
    <StepHeader title="Betaling niet geslaagd" image={<CadeauSvg />} />
    <StepSection>
      <p>Bij de betaling ging iets mis.</p>
      <p>Probeer het later nog eens of neem contact op via <a href="mailto:sinterklaas@nederlandsecluboslo.nl">sinterklaas@nederlandsecluboslo.nl</a> mocht dit probleem zich blijven voordoen.</p>
    </StepSection>
    <StepFooter>
      <div className={styles.footer}>
        <Link to="/">Opnieuw aanmelden</Link>
      </div>
    </StepFooter>
  </>)
};

export default ErrorPage;