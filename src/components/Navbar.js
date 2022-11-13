import React,  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Layout, Menu, Input, AutoComplete } from 'antd';
import { MenuOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';


import 'antd/dist/antd.css';
import './Navbar.css';

const { Header, Content } = Layout;
const { Title } = Typography;

function Navbar(NavBarProps) {

    const mockColors = ['red', 'black', 'blue'];

    const mockData = (str, colorIdx = 0) => ({
        value: str.concat(', ').concat(mockColors[colorIdx]),
    });

    const [searchVal, setSearchVal] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);

    const navigate = useNavigate();

    const gotoPage = (path) => {
        navigate(path);
    };

    const onSearch = (searchText) => {
        setSearchOptions(
            !searchText ? [] : [mockData(searchText), mockData(searchText, 1), mockData(searchText, 2)],
        );
    };

    const onSelect = (value) => console.log(value);

    const onChange = (data) => {
        setSearchVal(data);
    };

    return (
        <Row justify='center'>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Header className='header-fixed'>
                    <Row>
                        <Col xl={6} lg={6} md={6} sm={10} xs={10}>
                            <Title
                                   className='awesome-icon'
                                   code
                                   level={3}
                                   id='title-button'
                            >
                                <a className={'navbar-title'}
                                   onClick={() => gotoPage('')}>
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
                                <AutoComplete
                                    className='searchbar-nav'
                                    value={searchVal}
                                    options={searchOptions}
                                    onSelect={onSelect}
                                    onSearch={onSearch}
                                    onChange={onChange} >
                                    <Input.Search placeholder='Search for a product' enterButton />
                                </AutoComplete>

                                {/*TODO: icon show or not depends on the token*/}

                                <Menu.SubMenu
                                    className='submenu-navbar'
                                    key='SubMenu'
                                    title='Log In / Register'
                                    // TODO: change the user icon to have other menu items
                                    icon={<UserOutlined style={{fontSize: '1.3rem'}} />}>
                                    <Menu.Item
                                        key='login'
                                        onClick = {() => gotoPage('/login')}
                                    >
                                        Log In
                                    </Menu.Item>
                                    <Menu.Item
                                        key='register'
                                        onClick={() => gotoPage('/register')}
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
                                        onClick={() => gotoPage('cart')}
                                    >
                                       View Cart
                                    </Menu.Item>
                                    <Menu.Item
                                        key={'checkout'}
                                        onClick={() => gotoPage('checkout')}
                                    >
                                        Checkout
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
