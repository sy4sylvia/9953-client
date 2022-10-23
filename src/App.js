import React, { useState, useEffect} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout } from 'antd';

import './App.css';

import AuthService from './services/auth.service';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Test from './components/Test';
import Navbar from './components/Navbar';


const { Footer } = Layout;

function App() {
  return (
    <div className='App'>
        <Navbar />
        <div>
            <Routes>
                <Route exact path={'/'} element={<Home />} />
                <Route exact path={'/home'} element={<Home />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/test' element={<Test />} />
            </Routes>
        </div>
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            Awesome E-commerce ©{new Date().getFullYear()}
        </Footer>

    </div>
  );
}

export default App;
