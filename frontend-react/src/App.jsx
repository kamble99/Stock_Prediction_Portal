import { useState } from 'react'
import './index.css'
import './assets/css/style.css'
import Main from './components/Main'
import Register from './components/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'


function App() {
 

  return (
    <>
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BrowserRouter>
        <Header />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/register' element={<Register />} />
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
