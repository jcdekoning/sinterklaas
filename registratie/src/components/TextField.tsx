import React from "react";
import styles from './TextField.module.css';

type TextFieldProps = {
  name: string;
  label: string;
  description?: string;
  register: any;
  error?: string;
}

const TextField = (props: TextFieldProps) => {
  return <fieldset className={styles.textfield}>
    <label htmlFor={props.name}>{props.label}</label>
    {props.description && <p className={styles.description}>{props.description}</p>}
    <input name={props.name} ref={props.register} />
    {props.error && <p className={styles.error}>{props.error}</p>}
  </fieldset>
}

export default TextField;