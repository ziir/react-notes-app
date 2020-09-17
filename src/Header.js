import React from 'react';

import Link from './modules/Router/Link';

import './Header.css';
import logo from './logo.svg';

function Header() {
  return (
    <header className="Header">
      <h1>
        <Link to="/">
          <img src={logo} className="Header-logo" alt="" />
          My App
        </Link>
      </h1>
      <Link className="Header-cta" to="/new">
        New Thing
      </Link>
    </header>
  );
}

export default Header;
