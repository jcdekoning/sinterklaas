import React from 'react';
import useForm from "react-hook-form";
import { RouterProps, Redirect } from 'react-router';

import { FormContext } from '../FormContext';
import { Stap1FormData, Stap2FormData } from '../types/form';
import StepHeader from '../components/StepHeader';

type FormData = {
  roepnaamkind: string[];
  achternaamkind: string[];
  leeftijdkind: number[];
  geslachtkind: string[];
  anekdotekind: string[];
}

const mapToStateData = (data: FormData): Stap2FormData[] => {
  return data.roepnaamkind.map((_, index) => {
    return {
      voornaam: data.roepnaamkind[index],
      achternaam: data.achternaamkind[index],
      leeftijd: data.leeftijdkind[index],
      geslacht: data.geslachtkind[index],
      anekdote: data.anekdotekind[index]
    }
  });
}

const mapToFormData = (data: Stap2FormData[]): FormData => {
  return {
    roepnaamkind: data.map(k => k.voornaam),
    achternaamkind: data.map(k => k.achternaam),
    leeftijdkind: data.map(k => k.leeftijd),
    geslachtkind: data.map(k => k.geslacht),
    anekdotekind: data.map(k => k.anekdote),
  }
}

const Stap2 = (props: RouterProps) => {
  const { state, dispatch } = React.useContext(FormContext);
  const defaultValues = state.stap2 || [];
  const { register, errors, handleSubmit } = useForm<FormData>({ defaultValues: mapToFormData(defaultValues) });

  if (!state.stap1) {
    return <Redirect to='/' />
  }

  const stap1FormData = (state.stap1 as Stap1FormData);
  const aantalKinderen = stap1FormData.aantalKinderen;

  const onSubmit = (data: FormData, e: any) => {
    dispatch({ type: 'setStap2FormData', payload: mapToStateData(data) });
    props.history.push('/stap3');
  };

  const createArrayWithNumbers = (length: number) => {
    length = length || 1;
    return Array.from({ length }, (_, k) => k);
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <StepHeader title="Gegevens kinderen" />
    {createArrayWithNumbers(aantalKinderen).map(number => {
      return <div key={number}>
        <h2>Gegevens kind {number + 1}</h2>
        <fieldset>
          <label htmlFor="roepnaamkind">Roepnaam kind</label>
          <input name={`roepnaamkind[${number}]`} ref={register({
            required: "Vul de roepnaam van uw kind in"
          })} />
          {(errors as any)[`roepnaamkind[${number}]`] && <p className="error">{(errors as any)[`roepnaamkind[${number}]`].message}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="achternaamkind">Achternaam kind</label>
          <input name={`achternaamkind[${number}]`} ref={register({
            required: "Vul de achternaam van uw kind in"
          })} />
          {(errors as any)[`achternaamkind[${number}]`] && <p className="error">{(errors as any)[`achternaamkind[${number}]`].message}</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="leeftijdkind">Leeftijd kind</label>
          <input type="number" name={`leeftijdkind[${number}]`} ref={register({
            required: 'Vul de leeftijd van uw kind in',
            min: {
              value: 0,
              message: 'Leeftijd kan niet negatief zijn'
            },
            max: {
              value: 10,
              message: 'De maximale leeftijd is 10 jaar'
            }
          })} />
          {(errors as any)[`leeftijdkind[${number}]`] && <p className="error">{(errors as any)[`leeftijdkind[${number}]`].message}</p>}
        </fieldset>
        <fieldset>
          <legend>Geslacht kind</legend>
          <label><input
            name={`geslachtkind[${number}]`}
            type="radio"
            value="Jongen"
            ref={register({ required: true })}
          />Jongen</label>
          <label><input
            name={`geslachtkind[${number}]`}
            type="radio"
            value="Meisje"
            ref={register({ required: true })}
          />Meisje</label>
          {(errors as any)[`geslachtkind[${number}]`] && <p className="error">Kies een geslacht</p>}
        </fieldset>
        <fieldset>
          <label htmlFor="anekdotekind">Anekdote kind</label>
          <textarea name={`anekdotekind[${number}]`} rows={3} ref={register} />
        </fieldset>
      </div>
    })}
    <input type="submit" value="Verder" />
  </form>
}

export default Stap2;
