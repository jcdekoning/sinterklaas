import React from "react";
import styles from './NumericField.module.css';

type NumericFieldProps = {
  name: string;
  label: string;
  description?: string;
  register: any;
  error?: string;
}

const NumericField = (props: NumericFieldProps) => {
  return <fieldset className={styles.numericfield}>
    <label htmlFor={props.name}>{props.label}</label>
    {props.description && <p className={styles.description}>{props.description}</p>}
    <input name={props.name} type="number" ref={props.register} />
    {props.error && <p className={styles.error}>{props.error}</p>}
  </fieldset>
}

export default NumericField;