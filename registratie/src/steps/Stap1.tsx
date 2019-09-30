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

const Stap1 = (props: RouterProps) => {
  const { state, dispatch } = React.useContext(FormContext)
  const defaultValues = state.stap1 || {};
  const { register, errors, handleSubmit, watch } = useForm<Stap1FormData>({ defaultValues });

  const onSubmit = (data: Stap1FormData, e: any) => {
    dispatch({ type: 'setStap1FormData', payload: data });
    props.history.push('/stap2');
  };

  const kindOpSchool = watch('kindOpSchool');
  const lidVanClub = watch('lidVanClub');
  const gratisLidmaatschap = kindOpSchool === 'true' && watch('gratisLidmaatschap') === 'true';
  const aantalKinderen = parseInt(watch('aantalKinderen')) || 0;
  const aantalPersonen = parseInt(watch('aantalPersonen')) || 0;

  const lidmaatschap = ((kindOpSchool === 'false' && lidVanClub === 'false') || gratisLidmaatschap);

  return <form onSubmit={handleSubmit(onSubmit)}>
    <StepHeader title="Algemene gegevens" />
    <StepSection>
      <TextField
        name="naam"
        label="Uw naam"
        description="Vul uw voornaam en achternaam in."
        register={register({
          required: "Vul uw naam in"
        })}
        error={errors.naam && errors.naam.message} />
      <TextField
        name="email"
        label="Uw emailadres"
        description="We gebruiken uw emailadres voor verdere berichtgeving met betrekking tot het Sinterklaasfeest."
        register={register({
          required: "Vul uw emailadres in",
          pattern: {
            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "Het formaat van het ingevulde emailadres is ongeldig"
          }
        })}
        error={errors.email && errors.email.message} />
      <TwoOptionsField
        name="kindOpSchool"
        label="Heeft uw kinderen op de NTC Het Noorderlicht?"
        error={errors.kindOpSchool && "Maak een keuze"}
        optionOneLabel="Ja"
        optionOneValue="true"
        optionTwoLabel="Nee"
        optionTwoValue="false"
        register={register({ required: true })} />
      <TwoOptionsField
        name="lidVanClub"
        label="Bent u lid van de Nederlandse Club Oslo?"
        error={errors.lidVanClub && "Maak een keuze"}
        optionOneLabel="Ja"
        optionOneValue="true"
        optionTwoLabel="Nee"
        optionTwoValue="false"
        register={register({ required: true })} />
      {kindOpSchool === 'true' && lidVanClub === 'false' &&
        <TwoOptionsField
          name="gratisLidmaatschap"
          label="Wilt u lid worden van de Nederlandse Club Oslo?"
          description="Omdat u een of meerdere kinderen op de NTC Het Noorderlicht heeft, is een lidmaatschap van de Nederlandse Club Oslo geen vereiste om deel te nemen aan het Sinterklaasfeest. De Nederlandse Club Oslo biedt u wel een gratis lidmaatschap aan tot eind 2019. Wilt u van dit aanbod gebruik maken?"
          error={errors.lidVanClub && "Maak een keuze"}
          optionOneLabel="Ja"
          optionOneValue="true"
          optionTwoLabel="Nee"
          optionTwoValue="false"
          register={register({ required: true })} />
      }
      {lidmaatschap &&
        <>
          <h2>Lidmaatschap Nederlandse Club Oslo</h2>
          <p>{gratisLidmaatschap ? 'Voor het gratis lidmaatschap tot eind 2019 hebben we enkele extra gegevens nodig.' : 'Omdat u geen kinderen heeft op de NTC Het Noorderlicht is een lidmaatschap een vereiste om deel te nemen aan het Sinterklaasfeest. Vul hieronder de extra gegevens in voor het lidmaatschap.'}</p>
          <TextField
            name="adres"
            label="Uw adres"
            register={register({
              required: "Vul uw adres in"
            })}
            error={errors.adres && errors.adres.message} />
          <TextField
            name="telefoon"
            label="Uw telefoonnummer"
            register={register({
              required: "Vul uw telefoonnummer in"
            })}
            error={errors.telefoon && errors.telefoon.message} />
        </>
      }
      <h2>Wie komen er naar het Sinterklaasfeest?</h2>
      <p>Geef hieronder aan wie er mee komen naar het Sinterklaasfeest.</p>
      <NumericField
        name="aantalKinderen"
        label="Aantal kinderen tussen de 0 en 10 jaar."
        description="Alle kinderen (0-10 jaar) mogen op audiëntie en ontvangen een cadeautje van Sinterklaas. Daarnaast zijn er verschillende gezellige Sinterklaasactiviteiten."
        register={register({
          required: "Vul het aantal kinderen in",
          min: {
            value: 1,
            message: 'Minimaal aantal kinderen moet 1 zijn'
          },
          max: {
            value: 5,
            message: 'Er kunnen maximaal 5 kinderen worden ingeschreven. Wilt u meer kinderen aanmelden neem dan contact op via sinterklaas@nederlandsecluboslo.nl'
          }
        })}
        error={errors.aantalKinderen && errors.aantalKinderen.message} />
      <NumericField
        name="aantalPersonen"
        label="Aantal kinderen boven de 10 jaar/volwassenen"
        description="Per gezin hebben twee personen (boven de 10 jaar) gratis toegang tot het feest. Voor elke extra persoon boven de 10 jaar vragen we een vergoeding."
        register={register({
          required: "Vul het aantal kinderen boven de 10 jaar/volwassenen in",
          min: {
            value: 1,
            message: 'Minimaal aantal volwassenen moet 1 zijn'
          },
          max: {
            value: 10,
            message: 'Er kunnen maximaal 10 personen mee. Wilt u meer personen meenemen, neem dan contact op via sinterklaas@nederlandsecluboslo.nl'
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
      <span />
      <button type="submit">Verder</button>
    </StepFooter>
  </form>
}

export default Stap1;
