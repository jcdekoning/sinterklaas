import React from 'react';

export type RadioProps = {
  name?: string;
  value: string;
  label: string;
  register: any;
}

const Radio = ({ name, value, label, register }: RadioProps) => {
  const id = `${name}_${value}`;

  return <>
    <input id={id} type='radio' name={name} value={value} ref={register} />
    <label htmlFor={id}>{label}</label>
  </>
}

export default Radio;