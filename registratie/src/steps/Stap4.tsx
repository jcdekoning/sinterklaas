import React from 'react';
import useForm from "react-hook-form";
import { RouterProps, Redirect } from 'react-router';
import { FormContext } from '../FormContext';

import config from './../config';
import { Stap4FormData, FormState, Stap1FormData, Stap2FormData, Stap3FormData } from '../types/form';
import { Inschrijving } from '../types/api';
import StepHeader from '../components/StepHeader';
import StepSection from '../components/StepSection';
import StepFooter from '../components/StepFooter';
import TextAreaField from '../components/TextAreaField';

const mapFormStateToApiData = (state: FormState): Inschrijving => {
  const stap1 = state.stap1 as Stap1FormData;
  const stap2 = state.stap2 as Stap2FormData[];
  const stap3 = state.stap3 as Stap3FormData;
  const stap4 = state.stap4 as Stap4FormData;

  return {
    naam: stap1.naam,
    email: stap1.email,
    aantalPersonen: stap1.aantalPersonen,
    kindOpSchool: stap1.kindOpSchool,
    lidVanClub: stap1.lidVanClub,
    gratisLidmaatschap: stap1.gratisLidmaatschap,
    adres: stap1.adres,
    telefoon: stap1.telefoon,
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

      const stripe = (window as any).Stripe(config.stripe);
      stripe.redirectToCheckout({
        sessionId: responseJson.sessionId
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  return <form onSubmit={handleSubmit(onSubmit)}>
    <StepHeader title="Overzicht inschrijving" />
    <StepSection>
      <TextAreaField 
        name="commentaar"
        label="Heeft u nog overige vragen en/of opmerkingen?"
        register={register}/>
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
    </StepSection>
    <StepFooter>
      <input type="submit" value="Naar betaling" />
    </StepFooter>
  </form>
}

export default Stap4;
