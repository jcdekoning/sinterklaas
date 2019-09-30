import React from 'react';
import styles from './Checkbox.module.css';

type CheckboxProps = {
  label: string;
  name: string;
  register: any;
  error?: string;
}

const Checkbox = (props: CheckboxProps) => {
  return <fieldset className={styles.checkbox}>
    <input type="checkbox" id={props.name} name={props.name} value="true" ref={props.register} />
    <label htmlFor={props.name}>
      <div className={styles.check}></div>
      <span>{props.label}</span>
    </label>
    {props.error && <p className={styles.error}>{props.error}</p>}
  </fieldset>
}

export default Checkbox;