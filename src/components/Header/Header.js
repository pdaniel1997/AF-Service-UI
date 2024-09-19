import React from 'react';
import './Header.css';
import Logo from './images/ADCP-logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-text">ADCP Developer Service Desk</div>
      <div className="header-logo">
        <img src= {Logo} alt="Logo" />
      </div>
    </header>
  );
};

export default Header;
