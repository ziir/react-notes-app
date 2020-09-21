import React from 'react';
import Button from '../modules/UI/Button';
import logo from '../modules/UI/logo.svg';
import Link from '../modules/Router/Link';
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
      <Button as={Link} to="/new">
        New Thing
      </Button>
    </header>
  );
}

export default Header;
