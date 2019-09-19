import React from 'react';
import useForm from "react-hook-form";
import { RouterProps, Redirect } from 'react-router';

import { FormContext } from '../FormContext';
import { Stap3FormData } from '../types/form';

const Stap3 = (props: RouterProps) => {
  const { state, dispatch } = React.useContext(FormContext);
  const defaultValues = state.stap1 || {};
  const { register, errors, handleSubmit } = useForm<Stap3FormData>({ defaultValues });

  if (!state.stap2) {
    return <Redirect to='/stap2' />
  }

  const onSubmit = (data: Stap3FormData, e: any) => {
    dispatch({ type: 'setStap3FormData', payload: data });
    props.history.push('/stap4');
  };

  return <form onSubmit={handleSubmit(onSubmit)}>
    <h1>Aanmeldingsformulier Sinterklaas 2019</h1>
    <h2>Vrijwilligers</h2>
    <p>We hebben uw hulp hard nodig op zaterdag 24 november, want zonder vrijwilligers is het onmogelijk om het Sinterklaasfeest te organiseren. We hopen dat we op uw inzet kunnen rekenen!

Let op! Bij het inplannen van de vrijwilligers wordt rekening gehouden met de audiëntie van uw kind/kinderen aan Sinterklaas. U kunt deze samen met uw kind/kinderen bezoeken. Dit geldt ook voor het ontvangst van Sinterklaas. </p>
    <fieldset>
      <legend>Wilt u zich aanmelden als vrijwilliger?</legend>
      <label><input
        name="vrijwilliger"
        type="radio"
        value="uur"
        ref={register({ required: true })}
      />Ja, voor 1 uur</label>
      <label><input
        name="vrijwilliger"
        type="radio"
        value="dagdeel"
        ref={register({ required: true })}
      />Ja, voor een dagdeel (ochtend- of middagsessie)</label>
      <label><input
        name="vrijwilliger"
        type="radio"
        value="dagdeelzonderkind"
        ref={register({ required: true })}
      />Ja, voor een dagdeel waar mijn kind/kinderen NIET bij aanwezig is/zijn</label>
      <label><input
        name="vrijwilliger"
        type="radio"
        value="dag"
        ref={register({ required: true })}
      />Ja, voor de gehele dag</label>
      <label><input
        name="vrijwilliger"
        type="radio"
        value="nee"
        ref={register({ required: true })}
      />Nee</label>
      {errors.vrijwilliger && <p className="error">Maak een keuze</p>}
    </fieldset>
    <input type="submit" value="Verder" />
  </form>
}

export default Stap3;
