import React from 'react';
import styles from './Header.module.css';
import text from '../text';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>{text.header.title}</h1>
      <h2>{text.header.subheader}</h2>
    </header>
  )
}

export default Header;