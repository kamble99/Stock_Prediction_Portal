import React from 'react'
import predictiveChart from '../assets/Images/predictive-chart.png'
import Button from './Button'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar-container bg-light-white pt-3 pb-2" style={{display: 'flex',alignItems: 'center',justifyContent: 'space-between',padding: '10px 20px',flexWrap: 'wrap', }}>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={predictiveChart} alt="Predictive Chart" style={{ height: '60px', marginRight: '15px' }} />
        <h1 style={{ color: 'white', fontSize: '24px', margin: 0 }}>
          <Link className='text-light' to="/">Stock Prediction</Link>
        </h1>
      </div>

     
      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
        <Button text="Login" class="btn-outline-info" url="/login"/>
        <Button text="Register" class="btn-info" url="/register" />
      </div>
    </nav>
  )
}

export default Header
