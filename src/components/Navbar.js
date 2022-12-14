import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Typography, Layout, Menu, Input, AutoComplete } from 'antd';
import { MenuOutlined, ShoppingCartOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';


import 'antd/dist/antd.css';
import './Navbar.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const searchURL = 'http://localhost:8080/api/product/search';
const keywordURL = 'http://localhost:8080/api/product/keyword';

function Navbar(NavBarProps) {
    // TODO: disable the search bar
    if (localStorage.getItem('authorization') === null) {
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;


    const [searchVal, setSearchVal] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);

    const navigate = useNavigate();
    const curFirstName = localStorage.getItem('firstName');

    let greeting = '';
    let accountDisabled = true;
    let loginDisabled = false;

    if (curFirstName !== null) {
        // already logged in
        greeting = 'Hi, ' + curFirstName;
        accountDisabled = false;
        loginDisabled = true;
    }

    const onSearch = (searchText) => {
        console.log(searchText);

        localStorage.setItem('searchText', searchText);

        // connect to the backend
        axios.get(searchURL, {params: {q: searchText}})
            .then(function (response) {
                console.log('navbar search bar response from the backend', response);
                if (response.status === 200) {
                    console.log(response.data);
                    // populate all the data into the table
                    navigate('/results');
                } else {
                    alert('Please log in before you search for a product.');
                    navigate('/login');
                }
            }).catch((error) => alert(error));
    };

    const onSelect = (value) => console.log(value);

    const onChange = (data) => {
        setSearchVal(data);
        console.log(data); // one letter by letter

        axios.get(keywordURL, {params: {q: data}})
            .then(function (response) {
                console.log('response from the backend', response);
                if (response.status === 200) {
                    console.log(response.data.length);
                    const slicedArray = response.data.slice(0, 5);
                    console.log(slicedArray);
                    // setSearchOptions(
                    //     !slicedArray ? [] : slicedArray,
                    // );
                } else {
                    alert('Please log in before you begin searching.');
                    navigate('/login');
                }
            }).catch((error) => alert(error));

    };

    const handleLogout = () => {
        localStorage.clear();
        greeting = '';
        accountDisabled = true;
        loginDisabled = false;
        navigate('/');
    }

    return (
        <Row justify='center'>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Header className='header-fixed'>
                    <Row>
                        <Col xl={6} lg={6} md={6} sm={10} xs={10}>
                            <Title
                                   className='awesome-icon'
                                   keyboard
                                   level={3}
                                   id='title-button'
                            >
                                <a className={'navbar-title'}
                                   onClick={() => navigate('/')}>
                                    Awesome
                                </a>
                            </Title>
                        </Col>
                        <Col xl={18} lg={18} md={18} sm={14} xs={14}>
                            <Menu
                                theme='dark'
                                mode='horizontal'
                                defaultSelectedKeys={['account']}
                                overflowedIndicator={<MenuOutlined />}
                            >
                                {/*<Input.Search*/}
                                {/*    className='searchbar-nav'*/}
                                {/*    placeholder='Search for a product'*/}
                                {/*    enterButton*/}
                                {/*    onSearch={onSearch}*/}
                                {/*/>*/}

                                <AutoComplete
                                    className='searchbar-nav'
                                    value={searchVal}
                                    options={searchOptions}
                                    onSelect={onSelect}
                                    onSearch={onSearch}
                                    onChange={onChange} >
                                    <Input.Search
                                        placeholder='Search for a product'
                                        enterButton
                                        onSearch={onSearch}
                                    />
                                </AutoComplete>

                                <Menu.SubMenu
                                    disabled={accountDisabled}
                                    icon={<UserOutlined style={{fontSize: '1.3rem'}} />}
                                    key='accountMenu'
                                    title= {greeting}>
                                    <Menu.Item
                                        key='account'
                                        onClick={() => navigate('/account')}
                                    >
                                        My Account
                                    </Menu.Item>
                                    <Menu.Item
                                        key='address'
                                        onClick={() => navigate('/addresses')}
                                    >
                                        Address Book
                                    </Menu.Item>
                                    <Menu.Item
                                        key='order'
                                        onClick={() => navigate('/order-history')}
                                    >
                                        Order History
                                    </Menu.Item>
                                    <Menu.Item
                                        key={'logout'}
                                        onClick={handleLogout}
                                    >
                                        Log Out
                                    </Menu.Item>
                                </Menu.SubMenu>

                                <Menu.SubMenu
                                    className='submenu-navbar'
                                    disabled={loginDisabled}
                                    key='SubMenu'
                                    title='Log In / Register'>
                                    <Menu.Item
                                        key='login'
                                        onClick = {() => navigate('/login')}
                                    >
                                        Log In
                                    </Menu.Item>
                                    <Menu.Item
                                        key='register'
                                        onClick={() => navigate('/register')}
                                    >
                                        Register
                                    </Menu.Item>
                                </Menu.SubMenu>

                                <Menu.SubMenu
                                    key='cartMenu'
                                    title=''
                                    icon={<ShoppingCartOutlined style={{fontSize: '1.3rem'}} />}>
                                    <Menu.Item
                                        key='cart'
                                        onClick={() => navigate('/cart')}
                                    >
                                       View Cart
                                    </Menu.Item>
                                    <Menu.Item
                                        key='checkout'
                                        onClick={() => navigate('/checkout')}
                                    >
                                        Checkout
                                    </Menu.Item>
                                </Menu.SubMenu>

                                <Menu.SubMenu
                                    key='adminMenu'
                                    title='Admin'
                                    icon={<UserSwitchOutlined style={{fontSize: '1.3rem'}} />}
                                >
                                    <Menu.Item
                                        key='adminLogin'
                                        // change to update product page
                                        onClick={() => navigate('/admin-login')}
                                    >
                                        Log in as Admin
                                    </Menu.Item>

                                    <Menu.Item
                                        key='updateProduct'
                                        // change to update product page
                                        onClick={() => navigate('/update-product')}
                                    >
                                        Update Product
                                    </Menu.Item>
                                    <Menu.Item
                                        key='adminLogout'
                                        onClick={() => alert('You have successfully logged out')}
                                    >
                                        Log out as Admin
                                    </Menu.Item>
                                </Menu.SubMenu>

                            </Menu>
                        </Col>
                    </Row>
                </Header>
                <Content>{NavBarProps.items}</Content>
            </Col>
        </Row>
    )}

export default Navbar;
