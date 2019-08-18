import React from 'react';
import { Link } from 'react-router-dom';

const Vrijwilliger = () => {
  return <div>
    <h1>Vrijwilliger</h1>
    <Link to="/samenvatting">Verder</Link>
    <Link to="/kind/1">Terug</Link>
  </div>
}

export default Vrijwilliger;