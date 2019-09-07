import React from 'react';
import styles from './StepSection.module.css';

const StepSection = (props: any) => {
  return <section className={styles.section}>
    <div className={styles.content}>
      {props.children}
    </div>
  </section>
}

export default StepSection;

{/* <section>
      <div className={stepStyles.section}></div> */}