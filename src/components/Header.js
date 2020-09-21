import React from 'react';
import Link from '../modules/Router/Link';
import logo from '../modules/UI/logo.svg';
import './Header.css';

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
