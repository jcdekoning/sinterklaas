import React from 'react';
import { Link } from 'react-router-dom';
import StepHeader from '../components/StepHeader';
import StepSection from '../components/StepSection';

const Stap3 = () => {
  return <article>
    <StepHeader title="Opgeven als vrijwilliger" />
    <StepSection>
      Formulier
    </StepSection>
    <footer>
      <Link to="/stap4">Verder</Link>
      <Link to="/stap2">Terug</Link>
    </footer>
  </article>
}

export default Stap3;