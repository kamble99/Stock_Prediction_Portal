import './assets/css/style.css';
import Main from './components/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
