import React from 'react';
import { Link } from 'react-router-dom';
import StepHeader from '../components/StepHeader';
import StepSection from '../components/StepSection';

const Stap2 = () => {
  return <article>
    <StepHeader title="Gegevens kinderen" />
    <StepSection>
      Formulier
    </StepSection>
    <footer>
      <Link to="/stap3">Verder</Link>
      <Link to="/stap1">Terug</Link>
    </footer>
  </article>
}

export default Stap2;