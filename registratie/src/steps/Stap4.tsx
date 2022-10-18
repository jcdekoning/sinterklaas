import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RouterProps, Redirect } from 'react-router';
import { FormContext } from '../FormContext';

import config from './../config';
import {
  Stap4FormData,
  FormState,
  Stap1FormData,
  Stap2FormData,
} from '../types/form';
import { Inschrijving } from '../types/api';
import StepHeader from '../components/StepHeader';
import StepSection from '../components/StepSection';
import StepFooter from '../components/StepFooter';
import TextAreaField from '../components/TextAreaField';
import Checkbox from '../components/Checkbox';
import OverzichtStap1 from '../components/OverzichtStap1';
import OverzichtStap2 from '../components/OverzichtStap2';
import OverzichtEntreegeld from '../components/OverzichtEntreegeld';

import { ReactComponent as KlompSvg } from '../images/klomp.svg';
import text from '../text';

const mapFormStateToApiData = (state: FormState): Inschrijving => {
  const stap1 = state.stap1 as Stap1FormData;
  const stap2 = state.stap2 as Stap2FormData[];
  const stap4 = state.stap4 as Stap4FormData;

  return {
    naam: stap1.naam,
    email: stap1.email,
    kindOpSchool: stap1.kindOpSchool === 'true',
    lidVanClub: stap1.lidVanClub === 'true',
    gratisLidmaatschap: stap1.gratisLidmaatschap === 'true',
    straatnaam: stap1.straatnaam,
    postcode: stap1.postcode,
    plaats: stap1.plaats,
    telefoon: stap1.telefoon,
    kinderen: stap2.map((kind) => {
      return {
        voornaam: kind.voornaam,
        achternaam: kind.achternaam,
        leeftijd: kind.leeftijd,
        geslacht: kind.geslacht,
        eten: kind.eten,
        speelgoed: kind.speelgoed,
        hobby: kind.hobby,
        ruimtevoorverbetering: kind.ruimtevoorverbetering,
        vraagsintenpiet: kind.vraagsintenpiet
      };
    }),
    commentaar: stap4.commentaar,
    privacyverklaring: stap4.privacyverklaring === 'true',
    aantalPersonen: stap1.aantalPersonen
  };
};

const Stap4 = (props: RouterProps) => {
  const { state, dispatch } = React.useContext(FormContext);
  const { register, errors, handleSubmit, getValues } = useForm<
    Stap4FormData
  >();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  if (!state.stap2) {
    return <Redirect to="/stap2" />;
  }

  const onSubmit = async (data: Stap4FormData, e: any) => {
    try {
      setSubmitError(undefined);
      setIsSubmitting(true);
      const response = await fetch(`${config.api}/inschrijving`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(mapFormStateToApiData({ ...state, stap4: data })),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const responseJson = await response.json();

      const stripe = (window as any).Stripe(config.stripe);
      stripe.redirectToCheckout({
        sessionId: responseJson.sessionId,
      });
    } catch (e) {
      if (e instanceof Error) {
        setSubmitError((e as Error).message);
      } else {
        setSubmitError('Onbekende fout');
      }
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    const currentValues = getValues();
    dispatch({ type: 'setStap4FormData', payload: currentValues });
    props.history.push('/stap2');
  };

  const stap1FormData = state.stap1 as Stap1FormData;
  const gratisLidmaatschap = stap1FormData.gratisLidmaatschap ? true : false;
  const lidmaatschap =
    (stap1FormData.kindOpSchool === 'false' &&
      stap1FormData.lidVanClub === 'false') ||
    gratisLidmaatschap;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepHeader title={text.stap4.title} image={<KlompSvg />} />
      <StepSection>
        <OverzichtStap1 {...stap1FormData} />
        <OverzichtStap2 kinderen={state.stap2 as Stap2FormData[]} />
        <OverzichtEntreegeld
          aantalKinderen={stap1FormData.aantalKinderen}
          aantalPersonen={0}
          lidmaatschap={lidmaatschap}
          gratisLidmaatschap={gratisLidmaatschap}
        />
        <h2>{text.stap4.privacyverklaring.title}</h2>
        {text.stap4.privacyverklaring.description}
        <Checkbox
          label={text.stap4.privacyverklaring.label}
          name="privacyverklaring"
          register={register({ required: true })}
          error={errors.privacyverklaring && text.stap4.privacyverklaring.error}
        />
        <TextAreaField
          name="commentaar"
          label={text.stap4.commentaar.label}
          register={register}
        />
        {submitError && <p>{text.submitError(submitError)}</p>}
      </StepSection>
      <StepFooter>
        <button type="button" onClick={goBack}>
          {text.buttonBack}
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? text.buttonWait : text.buttonPayment}
        </button>
      </StepFooter>
    </form>
  );
};

export default Stap4;
