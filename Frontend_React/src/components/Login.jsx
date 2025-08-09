import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
     <div className='rounded'
      style={{
        minHeight: 'calc(1vh - 80px)', // leaves space for navbar height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '80px', // small distance from navbar
      }}
    >
      <div className="register-card align-item-center p-4 rounded shadow-lg text-center">
        <h3 className="mb-3 text-white fw-bold">Login In</h3>
        <form>
          <input type="text" className="form-control mb-3"placeholder="Enter your username"/>
          
          <input type="password"className="form-control mb-4" placeholder="Enter your password"/>
          <button type='submit' className="btn btn-dark w-100 fw-bold mb-2">Login</button>
          <p className="text-white fw-bold">Don't have an account? <Link to="/register" className='text-warning fw-bold'>Register</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login
