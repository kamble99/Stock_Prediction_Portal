import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


const Register = () => {
  const [username, SetUsername] = useState('')
  const [firstname, Setfirstname] = useState('')
  const [lastname, SetLastname] = useState('')
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [error,SetError]=useState({})

  const handleregisteration = async (e) => {
    e.preventDefault();

    const userdata = {
      username, firstname, lastname, email, password
    }
    console.log('data==>', userdata)

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', userdata);
      if (response && response.data) 
        {
        // console.log('data==>', response.data);
        console.log('Registration successful');
      }
    } catch (error) {
      SetError(error.response.data)
      console.error("Registration error:", error.response?.data || error.message);
    }
  }

    return (
      <>
        <div className="re-container mt-4 ">
          <div className="row justify-content-center">
            <div className="col-md-6 bg-light-dark p-5 rounded">
              <h3 className="text-light text-center mb-4">Create an Account</h3>
              <form onSubmit={handleregisteration}>
                <div className="mb-2">
                <input type="text" className='form-control' placeholder='username' value={username} autoComplete="username" onChange={(e) => SetUsername(e.target.value)} />
                <small>{error.username && <div className="text-danger">{error.username}</div>}</small>
                </div>
                <input type="text" className='form-control mb-3' placeholder='First name' value={firstname} onChange={(e) => Setfirstname(e.target.value)} />
                <input type="text" className='form-control mb-3' placeholder='Last name' value={lastname} onChange={(e) => SetLastname(e.target.value)} />
                <input type="text" className='form-control mb-3' placeholder='Email' value={email} onChange={(e) => SetEmail(e.target.value)} />
                <input type="password" className='form-control mb-3 ' placeholder='Set Password' value={password} onChange={(e) => SetPassword(e.target.value)} autoComplete="new-password" />
                <button type='submit' className='btn btn-info d-block mx-auto'>Register</button>
                {/* <label className='text-light text-center'>already have account?<Link className='text-light' to="/Login">Sign in</Link></label> */}

              </form>
            </div>
          </div>
        </div>
      </>
    )
  }

  export default Register
