import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Row, Col, Typography, Layout, Menu, Input, Form, Modal, Select, Button} from 'antd';
import { MenuOutlined, ShoppingCartOutlined, UserOutlined, DownOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;


function Navbar(NavBarProps) {
    // following states are for the pop-up window
    // sign up
    const [isModalOpen, setIsModalOpen] = useState(false);
    // sign in
    // const [isSignInModelOpen, setSignInModelOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        console.log('set to false')
    };

    // const showSignInModal = () => {
    //     setSignInModelOpen(true);
    // };
    //
    // const handleSignInOk = () => {
    //     setSignInModelOpen(false);
    // };
    //
    // const handleSignInCancel = () => {
    //     setSignInModelOpen(false);
    // };

    // states for the form
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const children = [];
    // TODO: these items should be retrieved from the database
    children.push(<Option>{"What is your mother's maiden name?"}</Option>);
        const handleSelectChange = (value) => {
        console.log(`Selected: ${value}`);
    };

        // direct to other pages
        const navigate = useNavigate();

        const gotoPage = (path) => {
        //GO TO MENU ITEM PAGE
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
                                        // onClick = {showSignInModal}
                                    >
                                        Sign In
                                    </Menu.Item>
                                    <Menu.Item
                                        key='sign-up'
                                        onClick={showModal}
                                    >
                                        Sign Up
                                    </Menu.Item>
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
