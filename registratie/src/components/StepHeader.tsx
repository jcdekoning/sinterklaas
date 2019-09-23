import React from 'react';
import styles from './StepHeader.module.css';

type StepHeaderProps = {
  title: string;
}

const StepHeader = (props: StepHeaderProps) => {
  return (
    <header>
      <div className={styles.content}>
        <h2>Inschrijving Sinterklaas</h2>
        <h1>{props.title}</h1>
      </div>
    </header>
  )
}

export default StepHeader;