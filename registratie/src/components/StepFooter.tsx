import React, { PropsWithChildren } from 'react';
import styles from './StepFooter.module.css';


const StepFooter = (props: PropsWithChildren<{}>) => {
  return (
    <footer>
      <div className={styles.content}>
        {props.children}
      </div>
    </footer>
  )
}

export default StepFooter;