import React from "react";
import styles from './TextField.module.css';

type TextFieldProps = {
  name: string;
  label: string;
  description?: string;
  register: any;
  error?: string;
  type?: string;
}

const TextField = (props: TextFieldProps) => {
  return <fieldset className={styles.textfield}>
    <label htmlFor={props.name}>{props.label}</label>
    {props.description && <p className={styles.description}>{props.description}</p>}
    <input type={props.type || "text"} name={props.name} ref={props.register} />
    {props.error && <div className={styles.error}>{props.error}</div>}
  </fieldset>
}

export default TextField;