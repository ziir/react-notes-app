import React from 'react';
import Button from '../modules/UI/Button';
import logo from '../modules/UI/logo.svg';
import Link from '../modules/Router/Link';
import './Header.css';

function Header() {
  return (
    <header role="banner" className="Header">
      <h1>
        <Link to="/" data-testid="home-link">
          <img src={logo} className="Header-logo" alt="" />
          React Notes App
        </Link>
      </h1>
      <Button as={Link} to="/new">
        New Note
      </Button>
    </header>
  );
}

export default Header;
