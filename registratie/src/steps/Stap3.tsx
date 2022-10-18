import React from 'react';
import { useForm } from 'react-hook-form';
import { RouterProps, Redirect } from 'react-router';

import { FormContext } from '../FormContext';
import { Stap3FormData, Stap1FormData } from '../types/form';
import StepHeader from '../components/StepHeader';
import StepSection from '../components/StepSection';
import StepFooter from '../components/StepFooter';
import RadioGroup from '../components/RadioGroup';

import { ReactComponent as PaardSvg } from '../images/paard.svg';
import text from '../text';

const Stap3 = (props: RouterProps) => {
  const { state, dispatch } = React.useContext(FormContext);
  const defaultValues = state.stap3 || {};
  const { register, errors, handleSubmit, getValues } = useForm<Stap3FormData>({ defaultValues });

  if (!state.stap2) {
    return <Redirect to='/stap2' />
  }

  const stap1FormData = (state.stap1 as Stap1FormData);
  const aantalKinderen = stap1FormData.aantalKinderen;

  const onSubmit = (data: Stap3FormData, e: any) => {
    dispatch({ type: 'setStap3FormData', payload: data });
    props.history.push('/stap4');
  };

  const goBack = () => {
    const currentValues = getValues();
    dispatch({ type: 'setStap3FormData', payload: currentValues });
    props.history.push('/stap2');
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <StepHeader title={text.stap3.title} image={<PaardSvg />} />
    <StepSection>
      {text.stap3.description(aantalKinderen)}
      <RadioGroup
        label={text.stap3.vrijwilliger.label}
        name="vrijwilliger"
        options={[
          { value: 'uur', label: text.stap3.vrijwilliger.optionUur },
          { value: 'dagdeel', label: text.stap3.vrijwilliger.optionDagdeel },
          { value: 'dag', label: text.stap3.vrijwilliger.optionDag },
          { value: 'nee', label: text.stap3.vrijwilliger.optionNee },
        ]}
        register={register({ required: true })}
        error={errors.vrijwilliger && text.stap3.vrijwilliger.error} />
    </StepSection>
    <StepFooter>
      <button type="button" onClick={goBack}>{text.buttonBack}</button>
      <button type="submit">{text.buttonNext}</button>
    </StepFooter>
  </form>
}

export default Stap3;
