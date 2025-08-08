import React from 'react';
import predicted from '../assets/Images/predictive-chart.png';
import Button from './Button';

const Header = () => {
  return (
    <nav
      className="navbar-container"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 30px',
        background: 'linear-gradient(90deg, white)', // smooth gradient
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // soft shadow
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href="">
          <img
            src={predicted}
            alt="Predictive Chart"
            style={{ height: '55px', marginRight: '12px' }}
          />
        </a>
        <h1 style={{ color: 'blueviolet', fontWeight: 'bold', fontSize: '24px', margin: 0 }}>
          Stock Prediction Portal
        </h1>
      </div>

      <div>
        <Button text='login' class="btn-dark"/>
        &nbsp;
        <Button text='Register' class="  btn-dark" />
        
      </div>
    </nav>
  );
};

export default Header;
