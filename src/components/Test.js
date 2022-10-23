import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';

//TODO: move styling to css/less files

const { Header, Content, Footer } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));


const Test = () => (
    <Layout>
        <Header className='header'>
            header
        </Header>
        <Content
            style={{
                padding: '0 50px',
            }}
        >
            <Layout
                className="site-layout-background"
                style={{
                    padding: '24px 0',
                }}
            >
                <Content
                    style={{
                        padding: '0 24px',
                        minHeight: 280,
                    }}
                >
                    <ShoppingCartOutlined />
                    Content
                </Content>
            </Layout>
        </Content>
    </Layout>
);
export default Test;