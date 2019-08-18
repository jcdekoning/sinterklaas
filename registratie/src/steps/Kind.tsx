import React from 'react';
import { Link } from 'react-router-dom';

const Kind = () => {
  return <div>
    <h1>Gegevens kind</h1>
    <Link to="/vrijwilliger">Verder</Link>
    <Link to="/volwassene">Terug</Link>
  </div>
}

export default Kind;