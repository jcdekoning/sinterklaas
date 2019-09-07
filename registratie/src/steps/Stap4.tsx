import React from 'react';
import { Link } from 'react-router-dom';
import StepHeader from '../components/StepHeader';
import StepSection from '../components/StepSection';

const Stap4 = () => {
  return <article>
    <StepHeader title="Samenvatting" />
    <StepSection>
      Formulier
    </StepSection>
    <footer>
      <Link to="/">Naar betaling</Link>
      <Link to="/stap3">Terug</Link>
    </footer>
  </article>
}

export default Stap4;