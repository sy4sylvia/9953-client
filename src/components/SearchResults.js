// Abandoned
import React, { useState } from 'react';
import {Typography, Layout, Menu, Row, Col, Pagination} from 'antd';
import { DesktopOutlined, CloudSyncOutlined, HomeOutlined,} from '@ant-design/icons';

import { FURNITURE, OFFICE, TECHNOLOGY } from './CategoryItems'

const _ = require('lodash');

const { Title } = Typography;
const { Content, Sider } = Layout;

const style = {
    background: '#0092ff',
    padding: '8px 0',
};

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const furnitureChildren = [];
const officeChildren = [];
const techChildren = [];

_.forEach(FURNITURE, function(obj) {
    furnitureChildren.push(getItem(obj.label, obj.key));
});

_.forEach(OFFICE, function(obj) {
    officeChildren.push(getItem(obj.label, obj.key));
});

_.forEach(TECHNOLOGY, function(obj) {
    techChildren.push(getItem(obj.label, obj.key));
});

const items = [
    getItem('Furnitures', 'furniture', <HomeOutlined />, furnitureChildren),
    getItem('Office Supplies', 'office', <DesktopOutlined />, officeChildren),
    getItem('Technology', 'technology', <CloudSyncOutlined />, techChildren),
];

const SearchResults = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="logo" />
                TODO: choose the color of the title and move down a bit
                {/*<Title level={5} type = 'success'> Category </Title>*/}
                <Menu
                    theme='dark' defaultSelectedKeys={['furniture']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Title
                        style={{
                            marginTop: '36px',
                        }}
                    >
                        Search Results
                    </Title>

                    <div
                        className="site-layout-background"
                        style={{padding: '10px 120px'}} >

                        <Row
                            gutter={{ xs: 8,  sm: 16, md: 24, lg: 32,}}
                            style={{padding: '120px 120px'}}
                        >
                            <Col className="gutter-row" span={6}>
                                <div style={style}>product-1</div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div style={style}>product-2</div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div style={style}>product-3</div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div style={style}>product-4</div>
                            </Col>
                        </Row>
                        <Pagination
                            defaultCurrent={6} total={500}
                            style={{padding: '120px 0'}}
                        />
                    </div>

                </Content>
            </Layout>
        </Layout>
    );
};
export default SearchResults;