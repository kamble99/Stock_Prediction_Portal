import React from 'react'
import Button from './Button'





const Main = () => {
  return (
  <>
  
  <div className='container'>
    <div className='p-5 text-center bg-light-dark rounded'>
     <h1 style={{ color: 'blueviolet', fontWeight: 'bold', fontSize: '24px', margin: 0 }}>
          Stock Prediction Portal
        </h1>
        &nbsp;
        <p className='lead' style={{color:'black'}}>A Stock Prediction Portal built with Django (backend) and React (frontend) that allows users to view, analyze, and predict stock trends using historical data and machine learning models. The platform provides interactive charts, user authentication, and real-time updates for an intuitive and responsive experience.</p>
        <Button text="Explore" class=" btn-dark"  url="/dashboard"/>
    </div>
  </div>
  
  </>
  )
}

export default Main
