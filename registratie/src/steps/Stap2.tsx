import React from 'react';
import { useForm } from 'react-hook-form';
import { RouterProps, Redirect } from 'react-router';

import { FormContext } from '../FormContext';
import { Stap1FormData, Stap2FormData, Geslacht } from '../types/form';
import StepHeader from '../components/StepHeader';
import StepSection from '../components/StepSection';
import StepFooter from '../components/StepFooter';
import TextField from '../components/TextField';
import NumericField from '../components/NumericField';
import TwoOptionsField from '../components/TwoOptionsField';
import TextAreaField from '../components/TextAreaField';

import { ReactComponent as BoekSvg } from '../images/boek.svg';
import text from '../text';

type FormData = {
  roepnaamkind: string[];
  achternaamkind: string[];
  leeftijdkind: number[];
  geslachtkind: string[];
  eten: string[];
  speelgoed: string[];
  hobby: string[];
  ruimtevoorverbetering: string[];
  vraagsintenpiet: string[];
};

const mapToStateData = (data: FormData): Stap2FormData[] => {
  return data.roepnaamkind.map((_, index) => {
    return {
      voornaam: data.roepnaamkind[index],
      achternaam: data.achternaamkind[index],
      leeftijd: data.leeftijdkind[index],
      geslacht: data.geslachtkind[index] as Geslacht,
      eten: data.eten[index],
      speelgoed: data.speelgoed[index],
      hobby: data.hobby[index],
      ruimtevoorverbetering: data.ruimtevoorverbetering[index],
      vraagsintenpiet: data.vraagsintenpiet[index],
    };
  });
};

const mapToFormData = (data: Stap2FormData[]): FormData => {
  return {
    roepnaamkind: data.map((k) => k.voornaam),
    achternaamkind: data.map((k) => k.achternaam),
    leeftijdkind: data.map((k) => k.leeftijd),
    geslachtkind: data.map((k) => k.geslacht),
    eten: data.map((k) => k.eten),
    speelgoed: data.map((k) => k.speelgoed),
    hobby: data.map((k) => k.hobby),
    ruimtevoorverbetering: data.map((k) => k.ruimtevoorverbetering),
    vraagsintenpiet: data.map((k) => k.vraagsintenpiet),
  };
};

const Stap2 = (props: RouterProps) => {
  const { state, dispatch } = React.useContext(FormContext);
  const defaultValues = state.stap2 || [];
  const { register, errors, handleSubmit, getValues } = useForm<
    FormData
  >({ defaultValues: mapToFormData(defaultValues) });

  if (!state.stap1) {
    return <Redirect to="/" />;
  }

  const stap1FormData = state.stap1 as Stap1FormData;
  const aantalKinderen = stap1FormData.aantalKinderen;

  const onSubmit = (data: FormData, e: any) => {
    dispatch({ type: 'setStap2FormData', payload: mapToStateData(data) });
    props.history.push('/stap3');
  };

  const goBack = () => {
    const currentValues = getValues();
    dispatch({
      type: 'setStap2FormData',
      payload: mapToStateData(currentValues),
    });
    props.history.push('/stap1');
  };

  const createArrayWithNumbers = (length: number) => {
    length = length || 1;
    return Array.from({ length }, (_, k) => k);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepHeader title={text.stap2.title} image={<BoekSvg />} />
      <StepSection>
        {createArrayWithNumbers(aantalKinderen).map((number) => {
          return (
            <div key={number}>
              <h2>
                {text.stap2.gegevensKind} {number + 1}
              </h2>
              <TextField
                label={text.stap2.roepnaamKind.label}
                name={`roepnaamkind[${number}]`}
                register={register({
                  required: text.stap2.roepnaamKind.error,
                })}
                error={
                  (errors as any)[`roepnaamkind[${number}]`] &&
                  (errors as any)[`roepnaamkind[${number}]`].message
                }
              />
              <TextField
                label={text.stap2.achternaamKind.label}
                name={`achternaamkind[${number}]`}
                register={register({
                  required: text.stap2.achternaamKind.error,
                })}
                error={
                  (errors as any)[`achternaamkind[${number}]`] &&
                  (errors as any)[`achternaamkind[${number}]`].message
                }
              />
              <NumericField
                label={text.stap2.leeftijdKind.label}
                name={`leeftijdkind[${number}]`}
                register={register({
                  required: text.stap2.leeftijdKind.error.required,
                  min: {
                    value: 0,
                    message: text.stap2.leeftijdKind.error.min,
                  },
                  max: {
                    value: 10,
                    message: text.stap2.leeftijdKind.error.max,
                  },
                })}
                error={
                  (errors as any)[`leeftijdkind[${number}]`] &&
                  (errors as any)[`leeftijdkind[${number}]`].message
                }
              />
              <TwoOptionsField
                name={`geslachtkind[${number}]`}
                label={text.stap2.geslachtKind.label}
                error={
                  (errors as any)[`geslachtkind[${number}]`] &&
                  text.stap2.geslachtKind.error
                }
                optionOneLabel={text.stap2.geslachtKind.optionJongen}
                optionOneValue="Jongen"
                optionTwoLabel={text.stap2.geslachtKind.optionMeisje}
                optionTwoValue="Meisje"
                register={register({ required: true })}
              />
              <TextAreaField
                name={`eten[${number}]`}
                label={text.stap2.favorietEten.label}
                register={register({ required: false })}
                error={
                  (errors as any)[`eten[${number}]`] &&
                  text.stap2.favorietEten.error
                }
              />
              <TextAreaField
                name={`speelgoed[${number}]`}
                label={text.stap2.favorietSpeelgoed.label}
                register={register({ required: false })}
                error={
                  (errors as any)[`speelgoed[${number}]`] &&
                  text.stap2.favorietSpeelgoed.error
                }
              />
              <TextAreaField
                name={`hobby[${number}]`}
                label={text.stap2.hobby.label}
                register={register({ required: false })}
                error={
                  (errors as any)[`hobby[${number}]`] &&
                  text.stap2.hobby.error
                }
              /> <TextAreaField
                name={`ruimtevoorverbetering[${number}]`}
                label={text.stap2.ruimteVoorVerbetering.label}
                description={text.stap2.ruimteVoorVerbetering.description}
                register={register({ required: false })}
                error={
                  (errors as any)[`ruimtevoorverbetering[${number}]`] &&
                  text.stap2.ruimteVoorVerbetering.error
                }
              /> <TextAreaField
                name={`vraagsintenpiet[${number}]`}
                label={text.stap2.vraagVoorSintEnPiet.label}
                register={register({ required: false })}
                error={
                  (errors as any)[`vraagsintenpiet[${number}]`] &&
                  text.stap2.vraagVoorSintEnPiet.error
                }
              />
            </div>
          );
        })}
      </StepSection>
      <StepFooter>
        <button type="button" onClick={goBack}>
          {text.buttonBack}
        </button>
        <button type="submit">{text.buttonNext}</button>
      </StepFooter>
    </form>
  );
};

export default Stap2;
