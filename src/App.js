import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import './App.css';

import AuthService from './services/auth.service';
import Home from './components/Home';
import ChangePassword from './components/ChangePassword';
import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';
import Product from './components/Product';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ShippingMode from './components/ShippingMode';
import Payment from './components/Payment';
import Order from './components/Order';
import Account from './components/Account';
import AddressBook from './components/AddressBook';
import OrderHistory from './components/OrderHistory';
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
                <Route exact path = '/change-password' element={<ChangePassword />} />
                <Route exact path = '/search' element={<SearchResults />} />
                <Route exact path = '/product' element={<Product/>} />
                <Route exact path = '/cart' element={<Cart />} />
                <Route exact path = '/checkout' element={<Checkout />} />
                <Route exact path = '/shipping-mode' element={<ShippingMode />} />
                <Route exact path = '/payment' element={<Payment />} />
                <Route exact path = '/order' element={<Order />} />
                <Route exact path = '/account' element={<Account />} />
                <Route exact path = '/address-book' element={<AddressBook />} />
                <Route exact path = '/order-history' element={<OrderHistory />} />
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
