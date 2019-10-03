import React, { ReactElement } from 'react';
import styles from './TwoOptionsField.module.css';

type TwoOptionsFieldProps = {
  name: string;
  label: string;
  description?: string | ReactElement
  error?: string;
  register: any;
  optionOneValue: string;
  optionOneLabel: string;
  optionTwoValue: string;
  optionTwoLabel: string;
}

const TwoOptionsField = (props: TwoOptionsFieldProps) => {

  return <fieldset className={styles.radiogroup}>
    <legend>{props.label}</legend>
    {props.description && <p>{props.description}</p>}
    <ul>
      <li>
        <input id={`${props.name}_${props.optionOneValue}`} type='radio' name={props.name} value={props.optionOneValue} ref={props.register} />
        <label htmlFor={`${props.name}_${props.optionOneValue}`}>{props.optionOneLabel}</label>
      </li>
      <li>
        <input id={`${props.name}_${props.optionTwoValue}`} type='radio' name={props.name} value={props.optionTwoValue} ref={props.register} />
        <label htmlFor={`${props.name}_${props.optionTwoValue}`}>{props.optionTwoLabel}</label>
      </li>
    </ul>
    {props.error && <div className={styles.error}>{props.error}</div>}
  </fieldset>
}

export default TwoOptionsField;
