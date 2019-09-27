import React from 'react';
import styles from './RadioGroup.module.css';

type RadioGroupProps = {
  label: string;
  name: string;
  options: {
    value: string;
    label: string;
  }[];
  register: any;
  error?: string;
}

const RadioGroup = (props: RadioGroupProps) => {
  return <fieldset className={styles.radiogroup}>
    <legend>{props.label}</legend>
    <ul>
      {props.options.map((option, index) => {
        return <li key={index}>
          <input type="radio" id={`${props.name}_${option.value}`} name={props.name} value={option.value} ref={props.register} />
          <label htmlFor={`${props.name}_${option.value}`}>
            <div className={styles.check}></div>
            <span>{option.label}</span>
          </label>
        </li>
      })}
    </ul>
    {props.error && <p className={styles.error}>{props.error}</p>}
  </fieldset>
}

export default RadioGroup;