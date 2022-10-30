import React,  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Row, Col, Typography, Layout, Menu, Input } from 'antd';
import { MenuOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import AddAddressForm from './AddAddressForm';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

function Navbar(NavBarProps) {

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

    const onSearch = (value) => console.log(value);

    return (
        <Row justify='center'>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Header className='header-fixed'>
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={20} xs={20}>
                            <Title level={3} code id='title-button'>
                                <a className={'navbar-title'}
                                   onClick={() => gotoPage('')}>
                                    Awesome
                                </a>
                            </Title>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={4} xs={4}>
                            <Menu
                                theme='dark'
                                mode='horizontal'
                                defaultSelectedKeys={['account']}
                                overflowedIndicator={<MenuOutlined />}
                            >
                                <Search
                                    placeholder='input search text'
                                    onSearch={onSearch}
                                    enterButton
                                    style={{paddingTop: '2%', paddingRight: '5.5%'}}
                                />

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

                                <Menu.Item
                                    icon={
                                    <ShoppingCartOutlined
                                            style={{fontSize: '1.6rem'}}
                                        />
                                    }
                                key={'cart'}
                                onClick={() => gotoPage('cart')}
                                >
                                </Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </Header>
                <Content>{NavBarProps.items}</Content>
            </Col>
        </Row>
    )}

export default Navbar;
