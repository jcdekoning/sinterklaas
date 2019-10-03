import React from 'react';
import useForm from "react-hook-form";
import { RouterProps } from 'react-router';

import { FormContext } from './../FormContext';
import { Stap1FormData } from '../types/form';

import StepHeader from '../components/StepHeader';
import StepSection from '../components/StepSection';
import StepFooter from '../components/StepFooter';

import TextField from '../components/TextField';
import TwoOptionsField from '../components/TwoOptionsField';
import NumericField from '../components/NumericField';
import OverzichtEntreegeld from '../components/OverzichtEntreegeld';

import { ReactComponent as SinterklaasSvg } from '../images/sinterklaas.svg';
import text from '../text';

const Stap1 = (props: RouterProps) => {
  const { state, dispatch } = React.useContext(FormContext)
  const defaultValues = state.stap1 || {};
  const { register, errors, handleSubmit, watch, getValues } = useForm<Stap1FormData>({ defaultValues });

  const onSubmit = (data: Stap1FormData, e: any) => {
    dispatch({ type: 'setStap1FormData', payload: data });
    props.history.push('/stap2');
  };

  const goBack = () => {
    const currentValues = getValues();
    dispatch({ type: 'setStap1FormData', payload: currentValues });
    props.history.push('/');
  }

  const kindOpSchool = watch('kindOpSchool');
  const lidVanClub = watch('lidVanClub');
  const gratisLidmaatschap = kindOpSchool === 'true' && watch('gratisLidmaatschap') === 'true';
  const aantalKinderen = parseInt(watch('aantalKinderen')) || 0;
  const aantalPersonen = parseInt(watch('aantalPersonen')) || 0;

  const lidmaatschap = ((kindOpSchool === 'false' && lidVanClub === 'false') || gratisLidmaatschap);

  return <form onSubmit={handleSubmit(onSubmit)}>
    <StepHeader title={text.stap1.title} image={<SinterklaasSvg />} />
    <StepSection>
      <TextField
        name="naam"
        label={text.stap1.naam.label}
        description={text.stap1.naam.description}
        register={register({ required: true })}
        error={errors.naam && text.stap1.naam.error} />
      <TextField
        name="email"
        type="email"
        label={text.stap1.email.label}
        description={text.stap1.email.description}
        register={register({
          required: text.stap1.email.error.required,
          pattern: {
            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: text.stap1.email.error.invalid
          }
        })}
        error={errors.email && errors.email.message} />
      <TwoOptionsField
        name="kindOpSchool"
        label={text.stap1.kindOpSchool.label}
        error={errors.kindOpSchool && text.stap1.kindOpSchool.error}
        optionOneLabel={text.labelYes}
        optionOneValue="true"
        optionTwoLabel={text.labelNo}
        optionTwoValue="false"
        register={register({ required: true })} />
      <TwoOptionsField
        name="lidVanClub"
        label={text.stap1.lidVanClub.label}
        error={errors.lidVanClub && text.stap1.lidVanClub.error}
        optionOneLabel={text.labelYes}
        optionOneValue="true"
        optionTwoLabel={text.labelNo}
        optionTwoValue="false"
        register={register({ required: true })} />
      {kindOpSchool === 'true' && lidVanClub === 'false' &&
        <TwoOptionsField
          name="gratisLidmaatschap"
          label={text.stap1.gratisLidmaatschap.label}
          description={text.stap1.gratisLidmaatschap.description}
          error={errors.lidVanClub && text.stap1.gratisLidmaatschap.error}
          optionOneLabel={text.labelYes}
          optionOneValue="true"
          optionTwoLabel={text.labelNo}
          optionTwoValue="false"
          register={register({ required: true })} />
      }
      {lidmaatschap &&
        <>
          <h2>{text.stap1.lidmaatschap.label}</h2>
          <p>{gratisLidmaatschap ? text.stap1.lidmaatschap.descriptionGratis : text.stap1.lidmaatschap.descriptionVerplicht}</p>
          <TextField
            name="adres"
            label={text.stap1.adres.label}
            register={register({ required: true })}
            error={errors.adres && text.stap1.adres.error} />
          <TextField
            name="telefoon"
            type="tel"
            label={text.stap1.telefoon.label}
            register={register({ required: true })}
            error={errors.telefoon && text.stap1.telefoon.error} />
        </>
      }
      <h2>{text.stap1.deelnemers.title}</h2>
      <p>{text.stap1.deelnemers.description}</p>
      <NumericField
        name="aantalKinderen"
        label={text.stap1.aantalKinderen.label}
        description={text.stap1.aantalKinderen.description}
        register={register({
          required: text.stap1.aantalKinderen.error.required,
          min: {
            value: 1,
            message: text.stap1.aantalKinderen.error.min
          },
          max: {
            value: 5,
            message: text.stap1.aantalKinderen.error.max
          }
        })}
        error={errors.aantalKinderen && errors.aantalKinderen.message} />
      <NumericField
        name="aantalPersonen"
        label={text.stap1.aantalPersonen.label}
        description={text.stap1.aantalPersonen.description}
        register={register({
          required: text.stap1.aantalPersonen.error.required,
          min: {
            value: 1,
            message: text.stap1.aantalPersonen.error.min
          },
          max: {
            value: 10,
            message: text.stap1.aantalPersonen.error.max
          }
        })}
        error={errors.aantalPersonen && errors.aantalPersonen.message} />
      <OverzichtEntreegeld
        aantalKinderen={aantalKinderen}
        aantalPersonen={aantalPersonen}
        lidmaatschap={lidmaatschap}
        gratisLidmaatschap={gratisLidmaatschap} />
    </StepSection>
    <StepFooter>
      <button type="button" onClick={goBack}>{text.buttonBack}</button>
      <button type="submit">{text.buttonNext}</button>
    </StepFooter>
  </form>
}

export default Stap1;
