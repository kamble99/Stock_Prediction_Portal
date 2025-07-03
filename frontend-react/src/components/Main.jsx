import React from 'react';
import Button from './Button';

const Main = () => {
  return (
    <div
      className="main-wrapper" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '57vh', }}>
      <div className="container p-4 text-center bg-light-dark rounded">
        <h1 className="text-light">Stock prediction portal</h1>
        <p className="text-light lead">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde quas impedit omnis possimus, eum doloribus non nihil aliquid nulla maxime perferendis quod corporis ullam tenetur debitis tempore ducimus similique! Doloribus.
        </p>
                <Button text="Login" class="btn-outline-info"/>
      </div>
    </div>
  );
};

export default Main;
