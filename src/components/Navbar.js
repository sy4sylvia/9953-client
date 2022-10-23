import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Layout, Menu, Input } from 'antd';
import {MenuOutlined, ShoppingCartOutlined, UserOutlined,AudioOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

function Navbar(NavBarProps) {
    const navigate = useNavigate();

    const gotoPage = (path) => {
        //GO TO MENU ITEM PAGE
        navigate(path);
    };

    const onSearch = (value) => console.log(value);

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );

    return (
        <Row justify='center'>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Header className='header-fixed'>
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={20} xs={20}>
                            <Title id='title-button' level={4}>
                                <a onClick={() => gotoPage('')}>Awesome</a>
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
                                    placeholder="input search text"
                                    onSearch={onSearch}
                                    enterButton
                                    style={{paddingTop: '2%', paddingRight: '5.5%'}}
                                />

                                <Menu.Item
                                    key="item1"
                                    onClick={() => gotoPage("item1")}
                                >
                                    item1
                                </Menu.Item>
                                <Menu.Item
                                    icon={
                                        <UserOutlined
                                            style={{fontSize: '1.6rem'}}
                                        />
                                    }
                                    key={'account'}
                                    onClick={() => gotoPage('account')}
                                >
                                    item2 - need to add auth
                                </Menu.Item>
                                <Menu.Item
                                    icon={<ShoppingCartOutlined
                                        style={{fontSize: '1.6rem'}}
                                    />}
                                    key={'cart'}
                                    onClick={() => gotoPage('cart')}
                                >

                                </Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </Header>
                <Content>{NavBarProps.children}</Content>
            </Col>
        </Row>
    );
};

export default Navbar;

// module.exports = NavBarProps {
//     selectedPage: string;
//     children: React.ReactNode;
// }
