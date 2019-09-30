import React from 'react';
import useForm from "react-hook-form";
import { RouterProps, Redirect } from 'react-router';

import { FormContext } from '../FormContext';
import { Stap3FormData, Stap1FormData } from '../types/form';
import StepHeader from '../components/StepHeader';
import StepSection from '../components/StepSection';
import StepFooter from '../components/StepFooter';
import { singularOrPlural } from '../utils/text';
import RadioGroup from '../components/RadioGroup';

const Stap3 = (props: RouterProps) => {
  const { state, dispatch } = React.useContext(FormContext);
  const defaultValues = state.stap1 || {};
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
    <StepHeader title="Opgeven als vrijwilliger" />
    <StepSection>
      <p>We hebben uw hulp hard nodig op zaterdag 24 november, want zonder vrijwilligers is het onmogelijk om het Sinterklaasfeest te organiseren. We hopen dat we op uw inzet kunnen rekenen!<br /><br /></p>

      <p>Let op! Bij het inplannen van de vrijwilligers wordt rekening gehouden met de audiëntie van uw {singularOrPlural(aantalKinderen, 'kind', 'kinderen')} aan Sinterklaas. U kunt deze samen met uw {singularOrPlural(aantalKinderen, 'kind', 'kinderen')} bezoeken. Dit geldt ook voor het ontvangst van Sinterklaas. </p>
      <RadioGroup
        label="Wilt u zich aanmelden als vrijwilliger?"
        name="vrijwilliger"
        options={[
          { value: 'uur', label: 'Ja, voor 1 uur' },
          { value: 'dagdeel', label: `Ja, voor een dagdeel (ochtend- of middagsessie) waar mijn ${singularOrPlural(aantalKinderen, 'kind', 'kinderen')} bij aanwezig ${singularOrPlural(aantalKinderen, 'is', 'zijn')}` },
          { value: 'dagdeelzonderkind', label: `Ja, voor een dagdeel waar mijn ${singularOrPlural(aantalKinderen, 'kind', 'kinderen')} NIET bij aanwezig ${singularOrPlural(aantalKinderen, 'is', 'zijn')}` },
          { value: 'dag', label: 'Ja, voor de gehele dag' },
          { value: 'nee', label: 'Nee' },
        ]}
        register={register({ required: true })}
        error={errors.vrijwilliger && "Maak een keuze"} />
    </StepSection>
    <StepFooter>
      <button type="button" onClick={goBack}>Terug</button>
      <button type="submit">Verder</button>
    </StepFooter>
  </form>
}

export default Stap3;
