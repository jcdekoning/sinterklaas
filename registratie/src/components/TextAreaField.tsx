import React from "react";
import styles from './TextAreaField.module.css';

type TextAreaFieldProps = {
  name: string;
  label: string;
  description?: string;
  register: any;
  error?: string;
}

const TextAreaField = (props: TextAreaFieldProps) => {
  return <fieldset className={styles.textarea}>
    <label htmlFor={props.name}>{props.label}</label>
    {props.description && <p className={styles.description}>{props.description}</p>}
    <textarea name={props.name} ref={props.register} rows={3} />
    {props.error && <div className={styles.error}>{props.error}</div>}
  </fieldset>
}

export default TextAreaField;