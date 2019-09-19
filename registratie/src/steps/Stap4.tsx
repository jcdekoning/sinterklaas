import React from 'react';
import useForm from "react-hook-form";
import { RouterProps, Redirect } from 'react-router';
import { FormContext } from '../FormContext';

import config from './../config';
import { Stap4FormData, FormState, Stap1FormData, Stap2FormData, Stap3FormData } from '../types/form';
import { Inschrijving } from '../types/api';

const mapFormStateToApiData = (state: FormState): Inschrijving => {
  const stap1 = state.stap1 as Stap1FormData;
  const stap2 = state.stap2 as Stap2FormData[];
  const stap3 = state.stap3 as Stap3FormData;
  const stap4 = state.stap4 as Stap4FormData;

  return {
    naam: stap1.naam,
    email: stap1.email,
    aantalPersonen: stap1.aantalVolwassenen,
    relatie: stap1.relatie,
    kinderen: stap2.map(kind => {
      return {
        voornaam: kind.voornaam,
        achternaam: kind.achternaam,
        leeftijd: kind.leeftijd,
        geslacht: kind.geslacht,
        anekdote: kind.anekdote
      }
    }),
    vrijwilliger: stap3.vrijwilliger,
    commentaar: stap4.commentaar,
    privacyverklaring: stap4.privacyverklaring === "akkoord"
  }
}

const Stap4 = (props: RouterProps) => {
  const { state } = React.useContext(FormContext);
  const { register, errors, handleSubmit } = useForm<Stap4FormData>();

  if (!state.stap3) {
    return <Redirect to='/stap3' />
  }

  const onSubmit = async (data: Stap4FormData, e: any) => {
    try {
      const response = await fetch(`${config.api}/inschrijving`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(mapFormStateToApiData({ ...state, stap4: data })),

        });
      const responseJson = await response.json();
      console.log(responseJson);

      const stripe = (window as any).Stripe('pk_test_FbPLI6YGcTMjFEcccJvSi0zm');
      stripe.redirectToCheckout({
        sessionId: responseJson.sessionId
      }).then((result: any) => {
        console.log(result);
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  return <form onSubmit={handleSubmit(onSubmit)}>
    <h1>Aanmeldingsformulier Sinterklaas 2019</h1>
    <h2>Overzicht</h2>
    <pre>{JSON.stringify(state)}</pre>
    <fieldset>
      <label htmlFor="commentaar">Heeft u nog overige vragen en/of opmerkingen?</label>
      <textarea name="commentaar" rows={3} ref={register} />
    </fieldset>
    <fieldset>
      <legend>Privacyverklaring</legend>
      <p>
        Bij aanmelding worden uw persoonsgegevens en de gegevens van uw kind/kinderen bewaard door de Nederlandse Club Oslo. Op https://nederlandsecluboslo.nl/privacy kunt uw lezen waarom dit noodzakelijk is en hoe wij met deze gegevens omgaan.
      </p>
      <label><input
        name="privacyverklaring"
        type="checkbox"
        value="akkoord"
        ref={register({ required: true })}
      />Ik heb de privacyverklaring gelezen</label>
      {errors.privacyverklaring && <p className="error">Accepteer de privacyverklaring</p>}
    </fieldset>
    <input type="submit" value="Naar betaling" />
  </form>
}

export default Stap4;
