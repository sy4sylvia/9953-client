import React,  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Layout, Menu, Input, AutoComplete } from 'antd';
import { MenuOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import AddAddressForm from './AddAddressForm';

const { Header, Content } = Layout;
const { Title } = Typography;

function Navbar(NavBarProps) {

    const mockColors = ['red', 'black', 'blue'];

    const mockData = (str, colorIdx = 0) => ({
        value: str.concat(', ').concat(mockColors[colorIdx]),
    });

    const [searchVal, setSearchVal] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);

    const [openSignUpWindow, setOpenSignUpWindow] = useState(false);
    const [openSignInWindow, setOpenSignInWindow] = useState(false);
    const [openAddAddressWindow, setOpenAddAddressWindow] = useState(false);

    const showSignUpModal = () => {
        setOpenSignUpWindow(() => true);
    };

    const showSignInModal = () => {
        setOpenSignInWindow(() => true);
    };

    const SignUpModal = () => {
        const onCreate = (values) => {
            console.log('Received values of form: ', values);
            setOpenSignUpWindow(false);
            // event.stopPropagation();
            // open the add address window
            setOpenAddAddressWindow(true);
        };
        return (
            <div>
                <SignUpForm
                    open={openSignUpWindow}
                    onCreate={onCreate}
                    onCancel={(e) => {
                        e.stopPropagation();
                        setOpenSignUpWindow(false);
                    }}
                />
            </div>
        );
    };

    const AddAddressModal = () => {
        const onCreateAddAddress = (values) => {
            console.log('Received values of form: ', values);
            setOpenAddAddressWindow(false);
            setOpenSignUpWindow(false);
        };
        return (
            <div>
                <AddAddressForm
                    open={openAddAddressWindow}
                    onCreate={onCreateAddAddress}
                    onCancel={(e) => {
                        e.stopPropagation();
                        setOpenAddAddressWindow(false);
                    }}
                />
            </div>
        );
    };

    const SignInModal = () => {
        const onCreateSignIn = (values) => {
            console.log('Received values of form: ', values);
            setOpenSignInWindow(false);
        };
        return (
            <div>
                <SignInForm
                    open={openSignInWindow}
                    onCreate={onCreateSignIn}
                    onCancel={(e) => {
                        e.stopPropagation();
                        setOpenSignInWindow(false);
                    }}
                />
            </div>
        );
    };

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
                    <Row >
                        <Col xl={6} lg={6} md={6} sm={10} xs={10}>
                            <Title level={3} code id='title-button'>
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
                                    value={searchVal}
                                    options={searchOptions}
                                    style={{
                                        width: '70%',
                                        paddingTop: '2%',
                                        paddingRight: '5.5%'
                                    }}
                                    onSelect={onSelect}
                                    onSearch={onSearch}
                                    onChange={onChange} >
                                    <Input.Search placeholder='Search for a product' enterButton />
                                </AutoComplete>

                                {/*TODO：style the icons: move down a bit*/}
                                {/*TODO: icon show or not depends on the token*/}

                                <Menu.SubMenu
                                    key='SubMenu'
                                    title='Sign In / Sign Up'
                                    icon={<UserOutlined style={{fontSize: '1.6rem'}} />}>
                                    <Menu.Item
                                        key='sign-in'
                                        onClick = {showSignInModal}
                                    >
                                        Sign In
                                        { openSignInWindow?  <SignInModal /> : null}
                                    </Menu.Item>
                                    <Menu.Item
                                        key='sign-up'
                                        onClick={showSignUpModal}
                                    >
                                        Sign Up
                                        { openSignUpWindow?  <SignUpModal /> : null}
                                    </Menu.Item>
                                    { openAddAddressWindow? <AddAddressModal />: null}
                                </Menu.SubMenu>

                                <Menu.SubMenu
                                    key='cartMenu'
                                    title=''
                                    icon={<ShoppingCartOutlined style={{fontSize: '1.6rem'}} />}>
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
