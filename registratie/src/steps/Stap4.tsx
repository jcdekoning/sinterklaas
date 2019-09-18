import React from 'react';
import useForm from "react-hook-form";
import { RouterProps, Redirect } from 'react-router';
import { FormContext, Stap4FormData } from '../FormContext';
import config from './../config';

const Stap4 = (props: RouterProps) => {
  const { state } = React.useContext(FormContext);
  const { register, errors, handleSubmit } = useForm<Stap4FormData>();

  if (!state.stap3) {
    return <Redirect to='/stap3' />
  }

  const onSubmit = async (data: Stap4FormData, e: any) => {
    const response = await fetch(`${config.api}/inschrijving`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({}),

      });
    const responseJson = await response.json();
    console.log(responseJson);

    const stripe = (window as any).Stripe('pk_test_FbPLI6YGcTMjFEcccJvSi0zm');
    stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: responseJson.sessionId
    }).then((result: any) => {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      console.log(result);
    });
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
