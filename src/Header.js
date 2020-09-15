import React from 'react';
import './Header.css';
import logo from './logo.svg';

function Header() {
  return (
    <header className="Header">
      <h1>
        <a href="/">
          <img src={logo} className="Header-logo" alt="" />
          My App
        </a>
      </h1>
      <a className="Header-cta" href="#new">
        New Thing
      </a>
    </header>
  );
}

export default Header;
