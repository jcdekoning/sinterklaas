import React from 'react';
import useForm from "react-hook-form";
import { RouterProps } from 'react-router';

import { FormContext } from './../FormContext';
import { Stap1FormData } from '../types/form';

import StepHeader from '../components/StepHeader';
import StepSection from '../components/StepSection';
import StepFooter from '../components/StepFooter';

import TextField from '../components/TextField';
import RadioGroup from '../components/RadioGroup';
import Radio from '../components/Radio';
import NumericField from '../components/NumericField';
import Lidmaatschap from '../components/Lidmaatschap';
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
  const aantalKinderen10Plus = parseInt(watch('aantalKinderen10Plus')) || 0;
  const aantalVolwassenen = parseInt(watch('aantalVolwassenen')) || 0;

  const aantalPersonen = aantalKinderen10Plus + aantalVolwassenen;
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
      <RadioGroup
        name="kindOpSchool"
        label="Heeft uw kinderen op de NTC Het Noorderlicht?"
        error={errors.kindOpSchool && errors.kindOpSchool.message} >
        <Radio value="true" label="Ja" register={register({ required: true })} />
        <Radio value="false" label="Nee" register={register({ required: true })} />
      </RadioGroup>
      <RadioGroup
        name="lidVanClub"
        label="Bent u lid van de Nederlandse Club Oslo?"
        error={errors.lidVanClub && errors.lidVanClub.message} >
        <Radio value="true" label="Ja" register={register({ required: true })} />
        <Radio value="false" label="Nee" register={register({ required: true })} />
      </RadioGroup>
      {kindOpSchool === 'true' && lidVanClub === 'false' &&
        <RadioGroup
          name="gratisLidmaatschap"
          label="Wilt u lid worden van de Nederlandse Club Oslo?"
          description="Omdat u een of meerdere kinderen op de NTC Het Noorderlicht heeft, is een lidmaatschap van de Nederlandse Club Oslo geen vereiste om deel te nemen aan het Sinterklaasfeest. De Nederlandse Club Oslo biedt u wel een gratis lidmaatschap aan tot eind 2019. Wilt u van dit aanbod gebruik maken?"
          error={errors.lidVanClub && errors.lidVanClub.message} >
          <Radio value="true" label="Ja" register={register({ required: true })} />
          <Radio value="false" label="Nee" register={register({ required: true })} />
        </RadioGroup>}
      {lidmaatschap &&
        <Lidmaatschap register={register} errors={errors} description={gratisLidmaatschap ? 'Voor het gratis lidmaatschap tot eind 2019 hebben we enkele extra gegevens nodig.' : 'Omdat u geen kinderen heeft op de NTC Het Noorderlicht is een lidmaatschap een vereiste om deel te nemen aan het Sinterklaasfeest. Vul hieronder de extra gegevens in voor het lidmaatschap.'} />
      }
      <h2>Wie komen er naar het Sinterklaasfeest?</h2>
      <p>Geef hieronder aan wie er mee komen naar het Sinterklaasfeest.</p>
      <p>Alle kinderen (0-10 jaar) mogen op audiëntie en ontvangen een cadeautje van Sinterklaas. Daarnaast zijn er verschillende gezellige Sinterklaasactiviteiten. </p>
      <p>Per gezin hebben twee personen (boven de 10 jaar) gratis toegang tot het feest. Voor elke extra persoon boven de 10 jaar vragen we een vergoeding.</p>
      <NumericField
        name="aantalKinderen"
        label="Aantal kinderen tussen de 0 en 10 jaar."
        register={register({
          required: "Vul uw naam in"
        })}
        error={errors.aantalKinderen && errors.aantalKinderen.message} />

      <NumericField
        name="aantalKinderen10Plus"
        label="Aantal kinderen boven de 10 jaar"
        register={register({
          required: "Vul uw naam in"
        })}
        error={errors.aantalKinderen10Plus && errors.aantalKinderen10Plus.message} />
      <NumericField
        name="aantalVolwassenen"
        label="Aantal volwassenen"
        register={register({
          required: "Vul uw naam in"
        })}
        error={errors.aantalVolwassenen && errors.aantalVolwassenen.message} />
      <OverzichtEntreegeld
        aantalKinderen={aantalKinderen}
        aantalPersonen={aantalPersonen}
        lidmaatschap={lidmaatschap}
        gratisLidmaatschap={gratisLidmaatschap} />
    </StepSection>
    <StepFooter>
      <input type="submit" value="Verder" />
    </StepFooter>
  </form>
}

export default Stap1;
