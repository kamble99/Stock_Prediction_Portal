import {useContext} from 'react';
import predicted from '../assets/Images/predictive-chart.png';
import Button from './Button';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../authProvider';

const Header = () => {
  const {isloggedin,setisloggedin}=useContext(AuthContext)
  const navigate=useNavigate();
  const handlelogout=(e)=>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setisloggedin(false)
    console.log('logged out')
    navigate('/login')
    
  }
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
        <Link to={"/"}><img src={predicted} alt="Predictive Chart"style={{ height: '55px', marginRight: '12px' }}/></Link>
        <h1 style={{ color: 'blueviolet', fontWeight: 'bold', fontSize: '24px', margin: 0 }}>
          Stock Prediction Portal
        </h1>
      </div>

      <div>
        {isloggedin ? (
          <button onClick={handlelogout} className='btn-danger rounded' >logout</button>
        ):(
          <>
        <Button text='login' class="btn-dark rounded" url='/login'/>
        &nbsp;
        <Button text='Register' class="  btn-dark rounded" url='/register' />
        
          </>
        )}
       
      </div>
    </nav>
  );
};

export default Header;
