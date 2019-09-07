import React from 'react';
import { Link } from 'react-router-dom';
import useForm from 'react-hook-form'

import StepHeader from '../components/StepHeader';
import StepSection from '../components/StepSection';

import stepStyles from './Steps.module.css';

const Stap1 = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  }

  return <article className={stepStyles.container}>
    <StepHeader title="Algemene gegevens" />
    <StepSection>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="naam">Je naam</label>
        <input type="text" placeholder="Je voor- en achternaam" name="naam" ref={register}></input>
        <label htmlFor="naam">Je emailadres</label>
        <input type="text" placeholder="Je emailadres" name="email" ref={register}></input>
      </form>
    </StepSection>
    <footer>
      <div className={stepStyles.footer}>
        <Link to="/stap2">Verder</Link>
        <Link to="/">Terug</Link>
      </div>
    </footer>
  </article>
}

export default Stap1;