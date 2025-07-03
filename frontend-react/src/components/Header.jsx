import React from 'react'
import predictiveChart from '../assets/Images/predictive-chart.png';
import Button from './Button';

const Header = () => {
  return (
    <>
    <nav className="navbar-container bg-light-white pt-3 pb-2" style={{ display: 'flex', alignItems: 'center',  padding: '10px 20px' }}>
      <img src={predictiveChart} alt="Predictive Chart" style={{ height: '60px', marginRight: '15px' }} />
      <h1 style={{ color: 'white', fontSize: '24px' }}>
        <a className='text-light' href="#">Stock Prediction</a>
      </h1>
      <div style={{display:"flex",marginLeft:"1000px"}}>
        <Button text="Login" class="btn-outline-info"/>
        &nbsp;
        <Button text="Register" class="btn-info"/>
        
      </div>
    </nav>
    </>
  );
};

export default Header
