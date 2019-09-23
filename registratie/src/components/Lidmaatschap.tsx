import React from 'react';
import TextField from './TextField';

type LidmaatschapProps = {
  description: string;
  register: any;
  errors: any;
};

const Lidmaatschap = (props: LidmaatschapProps) => {
  const { register, errors } = props;
  return <>
    <h2>Lidmaatschap Nederlandse Club Oslo</h2>
    <p>{props.description}</p>
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
export default Lidmaatschap; 