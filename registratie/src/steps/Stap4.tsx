import React, { useState } from 'react';
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
import Checkbox from '../components/Checkbox';
import OverzichtStap1 from '../components/OverzichtStap1';
import OverzichtStap2 from '../components/OverzichtStap2';
import OverzichtStap3 from '../components/OverzichtStap3';
import OverzichtEntreegeld from '../components/OverzichtEntreegeld';

import { ReactComponent as KlompSvg } from '../images/klomp.svg';

const mapFormStateToApiData = (state: FormState): Inschrijving => {
  const stap1 = state.stap1 as Stap1FormData;
  const stap2 = state.stap2 as Stap2FormData[];
  const stap3 = state.stap3 as Stap3FormData;
  const stap4 = state.stap4 as Stap4FormData;

  return {
    naam: stap1.naam,
    email: stap1.email,
    aantalPersonen: stap1.aantalPersonen,
    kindOpSchool: stap1.kindOpSchool === "true",
    lidVanClub: stap1.lidVanClub === "true",
    gratisLidmaatschap: stap1.gratisLidmaatschap === "true",
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
    privacyverklaring: stap4.privacyverklaring === "true"
  }
}

const Stap4 = (props: RouterProps) => {
  const { state, dispatch } = React.useContext(FormContext);
  const { register, errors, handleSubmit, getValues } = useForm<Stap4FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  if (!state.stap3) {
    return <Redirect to='/stap3' />
  }

  const onSubmit = async (data: Stap4FormData, e: any) => {
    try {
      setSubmitError(undefined);
      setIsSubmitting(true);
      const response = await fetch(`${config.api}/inschrijving`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(mapFormStateToApiData({ ...state, stap4: data })),

        });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const responseJson = await response.json();

      const stripe = (window as any).Stripe(config.stripe);
      stripe.redirectToCheckout({
        sessionId: responseJson.sessionId
      });
    } catch (e) {
      if (e instanceof Error) {
        setSubmitError((e as Error).message);
      } else {
        setSubmitError("Onbekende fout");
      }
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    const currentValues = getValues();
    dispatch({ type: 'setStap4FormData', payload: currentValues });
    props.history.push('/stap3');
  }

  const stap1FormData = state.stap1 as Stap1FormData;
  const gratisLidmaatschap = stap1FormData.gratisLidmaatschap ? true : false;
  const lidmaatschap = ((stap1FormData.kindOpSchool === "false" && stap1FormData.lidVanClub === "false") || gratisLidmaatschap);

  return <form onSubmit={handleSubmit(onSubmit)}>
    <StepHeader title="Overzicht inschrijving" image={<KlompSvg />} />
    <StepSection>
      <OverzichtStap1 {...stap1FormData} />
      <OverzichtStap2 kinderen={state.stap2 as Stap2FormData[]} />
      <OverzichtStap3 vrijwilliger={state.stap3.vrijwilliger} aantalKinderen={(state.stap1 as Stap1FormData).aantalKinderen} />
      <OverzichtEntreegeld
        aantalKinderen={stap1FormData.aantalKinderen}
        aantalPersonen={stap1FormData.aantalPersonen}
        lidmaatschap={lidmaatschap}
        gratisLidmaatschap={gratisLidmaatschap} />
      <h2>Privacyverklaring</h2>
      <p>
        Bij aanmelding worden uw persoonsgegevens en de gegevens van uw kind/kinderen bewaard door de Nederlandse Club Oslo. Op <a href="https://nederlandsecluboslo.nl/privacy" target="_blank" rel="noopener noreferrer">https://nederlandsecluboslo.nl/privacy</a> kunt uw lezen waarom dit noodzakelijk is en hoe wij met deze gegevens omgaan.
      </p>
      <Checkbox
        label="Ik heb de privacyverklaring gelezen"
        name="privacyverklaring"
        register={register({ required: true })}
        error={errors.privacyverklaring && "Accepteer de privacyverklaring"} />
      <TextAreaField
        name="commentaar"
        label="Heeft u nog overige vragen en/of opmerkingen?"
        register={register} />
      {submitError && <p>Er is iets mis {submitError}</p>}
    </StepSection>
    <StepFooter>
      <button type="button" onClick={goBack}>Terug</button>
      <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Een ogenblik geduld" : "Naar betalen"}</button>
    </StepFooter>
  </form>
}

export default Stap4;
