import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'



const Register = () => {
    const [username, setusername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const[success,setSuccess]=useState(false)
    const[loading,setLoading]=useState(false)

    const Registration = async (e) => {
        e.preventDefault()
        setLoading(true)


        const userdata = {
            username, email, password

        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', userdata)
            console.log('response.data=>', response.data)
            console.log('registration successfull')
            setError({});
            setSuccess(true)
            
        } catch (error) {
            setError(error.response.data)
            console.error(' error: ', error.response.data)
        }finally{
            setLoading(false)
        }
    }
    return (
        <div className='rounded' style={{ minHeight: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '80px' }}>
            <div className="register-card align-item-center p-3 rounded shadow-lg text-center">
                <h3 className="mb-3 text-white fw-bold">Create Account</h3>
                <form onSubmit={Registration}>
                    <div className='mb-3'>
                        <input type="text" className="form-control " placeholder="Enter your username" value={username} onChange={(e) => setusername(e.target.value)} />
                        <small>{error.username && <div className='text-light'>{error.username}</div>}</small>
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                         <small>{error.password && <div className='text-light'>{error.password}</div>}</small>
                    </div>
                    {success && <div className='alert alert-success'>Registration successfull</div>}
                    { loading ? (
                        <button type='submit' className="btn btn-dark w-100 fw-bold mb-2" disabled><FontAwesomeIcon icon={faSpinner} spin />Please wait...</button>
                     ):(
                         <button type='submit' className="btn btn-dark w-100 fw-bold mb-2">Register</button>
                        
                     )}
                   <div className='mb-3'>
                         <p className="text-white fw-bold">Already have  account? <Link to="/login" className='text-warning fw-bold'>Login</Link></p>
                   </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
