import React from 'react';
import {Typography, Select, Button, Row, Col, Divider} from 'antd';

import 'antd/dist/antd.css';

import { QUANTITY } from './Options';

const { Title } = Typography;

const Product = () => {

    const contentStyle = {
        height: '240px',
        color: '#fff',
        lineHeight: '240px',
        textAlign: 'center',
        background: '#364d79',
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div style={{padding: '120px 120px'}} >
            <Row
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}
            >
                <Col className="gutter-row" span={12}>
                    <div>
                        <h3 style={contentStyle}>Product Image</h3>
                    </div>
                </Col>
                <Col span={4}>

                </Col>
                <Col className="gutter-row" span={8}>
                    <div>
                        <Title level = {3}>
                            Stool 1
                        </Title>
                    </div>

                    <Divider />

                    <div>
                        <Title level = {3}>
                            {/*TODO: if on sale, change color to red*/}
                            $200
                        </Title>
                    </div>

                    <Divider />

                    <div>
                        <Title level = {5}>
                            Quantity
                        </Title>
                        <Select
                            defaultValue='1'
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            options={QUANTITY}
                        />
                        <Divider />
                    </div>
                    <Button type='primary' block>
                        Add To Cart
                    </Button>
                    <Divider />
                </Col>
            </Row>
        </div>
    )
};

export default Product;