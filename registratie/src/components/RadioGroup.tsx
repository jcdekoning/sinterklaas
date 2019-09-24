import React, { PropsWithChildren } from 'react';
import styles from './RadioGroup.module.css';
import { RadioProps } from './Radio';

type RadioGroupProps = {
  name: string;
  label: string;
  description?: string;
  error?: string;
}

const decorateChildrenWithProps = (children: React.ReactNode, name: string): React.ReactElement<RadioProps>[] => {
  return React.Children.map(children, child => {
    return React.cloneElement(child as React.ReactElement<RadioProps>, {
      name: name
    })
  })
}

const RadioGroup = (props: PropsWithChildren<RadioGroupProps>) => {

  const decoratedChildren = decorateChildrenWithProps(props.children, props.name);
  return <fieldset className={styles.radiogroup}>
    <legend>{props.label}</legend>
    {props.description && <p>{props.description}</p>}
    <ul>
      {decoratedChildren.map(child => {
        return <li key={child.props.value}>{child}</li>
      })}
    </ul>
    {props.error && <div className={styles.error}>{props.error}</div>}
  </fieldset>
}

export default RadioGroup;
