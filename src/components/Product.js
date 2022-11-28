import React from 'react';
import {Typography, Select, Button, Row, Col, Divider} from 'antd';
import axios from 'axios';

import { QUANTITY } from './Options';

import 'antd/dist/antd.css';

const { Title } = Typography;

const cartURL = 'http://localhost:8080/api/cart';

const Product = () => {

    const customerId = localStorage.getItem('customerId');
    const curProduct = JSON.parse(localStorage.getItem('curProduct'));

    const productId = curProduct.id;
    const productName = curProduct.productName;
    const unitPrice = curProduct.unitPrice;
    const discount = curProduct.discount;

    // TODO: change the product image
    const contentStyle = {
        height: '240px',
        color: '#fff',
        lineHeight: '240px',
        textAlign: 'center',
        background: '#364d79',
    };

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

    let quantity = 0;
    const handleChange = (value) => {
        quantity = value;
        console.log(typeof quantity);
        console.log(`selected ${value}`);
    };

    const handleAddToCart = (values) => {
        values = {'customerId': customerId};
        values = Object.assign({'productId': productId}, values);
        values = Object.assign({'quantity': quantity}, values);
        console.log(values);

        axios.post(cartURL, values).then(function (response) {
            console.log('response from the backend', response);
            if (response.status === 200) {
                console.log(response.data);
            } else {
                alert('Missing info');
            }
        }).catch(function (error) {
            console.log(error);
            alert(error);
        });
    }

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
                        <Title level = {3} italic ={true}>
                            {productName}
                        </Title>
                    </div>

                    <Divider />

                    <div>
                        <Title level = {3}>
                            {/*TODO: if on sale, change color to red*/}
                            ${unitPrice}
                        </Title>
                    </div>

                    <Divider />

                    {/*<div>*/}
                    {/*    <Typography.Paragraph type ='danger'>*/}
                    {/*        {discount}*/}
                    {/*    </Typography.Paragraph>*/}
                    {/*    <Divider />*/}
                    {/*</div>*/}

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
                    <Button type='primary' block onClick={handleAddToCart}>
                        Add To Cart
                    </Button>
                    <Divider />
                </Col>
            </Row>
        </div>
    )
};

export default Product;