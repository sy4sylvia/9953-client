import React, { useState, useEffect} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout } from 'antd';

import './App.css';

import AuthService from './services/auth.service';
import Home from './components/Home';
import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';
import Testv2 from "./components/Testv2";
import Test from './components/Test';



const { Footer } = Layout;

function App() {
  return (
    <div className='App'>
        <Navbar />
        <div>
            <Routes>
                <Route exact path={'/'} element={<Home />} />
                <Route exact path={'/home'} element={<Home />} />
                <Route exact path = '/search' element={<SearchResults />} />
                <Route exact path='/test' element={<Test />} />
                <Route exact path='/testv2' element={<Testv2 />} />
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
