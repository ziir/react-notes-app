import React from 'react';

import logo from './logo.svg';
import './Loader.css';

function Loader({ className = '' }) {
  return (
    <>
      <img src={logo} alt="" className={`Loader-img ${className}`} />
      <br />
      <span>Loading...</span>
    </>
  );
}

export default Loader;
