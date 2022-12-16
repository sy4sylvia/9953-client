import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import './App.css';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import UpdatePassword from './components/UpdatePassword';
import Navbar from './components/Navbar';
import Results from './components/Results';
import Product from './components/Product';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderPlaced from './components/OrderPlaced';
import Account from './components/Account';
import EditInfo from './components/EditInfo';
import AddressBook from './components/AddressBook';
import AddAddress from './components/AddAddress';
import EditAddress from './components/EditAddress';
import OrderHistory from './components/OrderHistory';
import AdminLogin from './components/AdminLogin';
import AdminUpdateProduct from './components/AdminUpdateProduct';


const { Footer } = Layout;

function App() {
    return (
        <div className='App'>
            <Navbar />
            <div>
                <Routes>
                    <Route exact path={'/'} element={<Home />} />
                    <Route exact path={'/home'} element={<Home />} />
                    <Route exact path = '/register' element={<Register />} />
                    <Route exact path = '/login' element={<Login />} />
                    <Route exact path = '/forgot-password' element={<ForgotPassword />} />
                    <Route path = '/change-password' element={<ChangePassword />} />
                    <Route exact path = '/results' element={<Results />} />
                    <Route exact path = '/product' element={<Product/>} />
                    <Route exact path = '/cart' element={<Cart />} />
                    <Route exact path = '/checkout' element={<Checkout />} />
                    <Route exact path = '/order-placed' element={<OrderPlaced />} />
                    <Route exact path = '/account' element={<Account />} />
                    <Route exact path = '/edit-info' element={<EditInfo />} />
                    <Route exact path = '/update-password' element={<UpdatePassword />} />
                    <Route exact path = '/addresses' element={<AddressBook />} />
                    <Route exact path = '/add-address' element={<AddAddress />} />
                    <Route exact path = '/edit-address' element={<EditAddress />} />
                    <Route exact path = '/order-history' element={<OrderHistory />} />
                    <Route exact path = '/admin-login' element={<AdminLogin />} />
                    <Route exact path = '/update-product' element={<AdminUpdateProduct />} />
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
