import React, { PropsWithChildren } from 'react';
import styles from './StepSection.module.css';

const StepSection = (props: PropsWithChildren<{}>) => {
  return <section className={styles.section}>
    <div className={styles.content}>
      {props.children}
    </div>
  </section>
}

export default StepSection;