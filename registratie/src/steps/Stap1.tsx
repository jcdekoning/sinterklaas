import React from 'react';
import useForm from "react-hook-form";
import { FormContext, Stap1FormData } from './../FormContext';
import { RouterProps } from 'react-router';

const Stap1 = (props: RouterProps) => {
  const { state, dispatch } = React.useContext(FormContext)
  const defaultValues = state.stap1 || {};
  const { register, errors, handleSubmit } = useForm<Stap1FormData>({ defaultValues });

  const onSubmit = (data: Stap1FormData, e: any) => {
    dispatch({ type: 'setStap1FormData', payload: data });
    props.history.push('/stap2');
  };

  return <form onSubmit={handleSubmit(onSubmit)}>
    <h1>Aanmeldingsformulier Sinterklaas 2019</h1>
    <h2>Gegevens volwassene</h2>
    <fieldset>
      <label htmlFor="naam">Uw naam</label>
      <p>Vul a.u.b. uw voornaam en achternaam in.</p>
      <input name="naam" ref={register({
        required: "Vul uw naam in"
      })} />
      {errors.naam && <p className="error">{errors.naam.message}</p>}
    </fieldset>
    <fieldset>
      <label htmlFor="email">Uw emailadres</label>
      <input name="email" ref={register({
        required: "Vul uw emailadres in",
        pattern: {
          value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          message: "Het formaat van het ingevulde emailadres is ongeldig"
        }
      })} />
      {errors.email && <p className="error">{errors.email.message}</p>}
    </fieldset>
    <fieldset>
      <label htmlFor="aantalVolwassenen">Met hoeveel personen (buiten de kinderen) komt u? </label>
      <p>Per gezin hebben twee personen (boven de 10 jaar) gratis toegang tot het feest. Voor elke extra persoon boven de 10 jaar vragen we 50 NOK  entree.</p>
      <select name="aantalVolwassenen" ref={register}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </fieldset>
    <fieldset>
      <legend>Heeft u kinderen op de NTC Het Noorderlicht en/of bent u lid van de Nederlandse Club Oslo?</legend>
      <label><input
        name="relatie"
        type="radio"
        value="School"
        ref={register({ required: true })}
      />Ik heb een kind op de NTC Het Noorderlicht (aanmelding kost 150 Nok per kind)</label>
      <label><input
        name="relatie"
        type="radio"
        value="Club"
        ref={register({ required: true })}
      />Ik ben lid van de Nederlandse Club Oslo (aanmelding kost 150 Nok per kind)</label>
      <label><input
        name="relatie"
        type="radio"
        value="NieuwLid"
        ref={register({ required: true })}
      />Ik heb geen kind op de NTC Het Noorderlicht en ben ook niet lid van de Nederlandse Club Oslo. Ik wil wel graag lid worden van de Nederlandse Club Oslo (aanmelding kost 150 Nok per kind + 175 Nok voor het lidmaatschap tot eind 2019)</label>
      {errors.relatie && <p className="error">Maak een keuze</p>}
    </fieldset>
    <h2>Aanmelding kinderen</h2>
    <fieldset>
      <label htmlFor="aantalKinderen">Met hoeveel kinderen komt u?</label>
      <select name="aantalKinderen" ref={register}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </fieldset>
    <input type="submit" value="Verder" />
  </form>
}

export default Stap1;
