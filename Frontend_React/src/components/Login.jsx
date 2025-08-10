import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { AuthContext } from '../authProvider';

const Login = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { isloggedin, setisloggedin } = useContext(AuthContext); // ✅ fixed
  const navigate = useNavigate();

  const submitlogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userdata = { username, password };
    console.log(userdata);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', userdata);
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      console.log('Login successful');
      setisloggedin(true);
      navigate('/dashbaord');
    } catch (error) {
      console.error('Invalid credentials');
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded"
      style={{
        minHeight: 'calc(1vh - 80px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '80px',
      }}
    >
      <div className="register-card align-item-center p-4 rounded shadow-lg text-center">
        <h3 className="mb-3 text-white fw-bold">Login In</h3>
        <form onSubmit={submitlogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-light">{error}</div>}
          {loading ? (
            <button
              type="submit"
              className="btn btn-dark w-100 fw-bold mb-2"
              disabled
            >
              <FontAwesomeIcon icon={faSpinner} spin /> Logging in...
            </button>
          ) : (
            <button type="submit" className="btn btn-dark w-100 fw-bold mb-2">
              Login
            </button>
          )}
          <div className="mb-3">
            <p className="text-white fw-bold">
              Don't have an account?{' '}
              <Link to="/register" className="text-warning fw-bold">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
