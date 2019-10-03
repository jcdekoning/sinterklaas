import React, { ReactElement } from 'react';
import styles from './StepHeader.module.css';
import text from '../text';

type StepHeaderProps = {
  title: string;
  image: ReactElement;
}

const StepHeader = (props: StepHeaderProps) => {
  return (
    <header>
      <div className={styles.content}>
        <h2>{text.formTitle}</h2>
        <div className={styles.subheader}>
          {props.image}
          <h1>{props.title}</h1>
        </div>
      </div>
    </header>
  )
}

export default StepHeader;