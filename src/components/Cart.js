import React, {useState} from 'react';
import {Typography, Button, Row, Col, Divider} from 'antd';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import 'antd/dist/antd.css';

const { Title } = Typography;
const cartURL = 'http://localhost:8080/api/cart';

const Cart = () => {

    const style = {
        background: '#0092ff',
        height: '120px',
        padding: '8px 0',
        textAlign: 'center',
    };

    const navigate = useNavigate();

    const curCustomerId = localStorage.getItem('customerId');
    const [cartItems, setCartItems] = useState(null);
    const productNames=  [];
    const quantities = [];
    const prices = [];

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

    if (cartItems === null) {
        axios.get(cartURL +'/' + curCustomerId)
            .then(function (response) {
                if (response.status === 200) {
                    console.log(response.data);
                    setCartItems(response.data);
                } else {
                    alert('Please log in to view your cart.');
                    navigate('/login');
                }
            }).catch(function (error) {
            console.log(error);
            alert(error);
        });
    }

    if (cartItems !== null) {
        for (let i = 0; i < cartItems.length; i++) {
            productNames.push(cartItems[i].productName);
            quantities.push(cartItems[i].quantity);
            prices.push(cartItems[i].unitPrice);
        }
    }

    const handleChangeQuantity = (value) => {
        console.log(value);
    }
    return (
        <div>
        <div style={{padding: '120px 120px'}} >
            <Row
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}
            >
                <Col className="gutter-row" span={16}>
                    <Row>
                        <Col span={6}><h3 style={style}>Product Image</h3></Col>
                        <Col span={6}><Title level = {4}>{productNames[0]}</Title></Col>
                        <Col span={4} />
                        <Col span={8}><Col><Title level = {5}>${prices[0] * quantities[0]}</Title></Col>
                            <Col>
                                <Title level = {5}>Quantity: {quantities[0]}</Title>
                                {/*TODO: add the edit window here*/}
                                {/*<Typography.Paragraph editable={{*/}
                                {/*    onChange: handleChangeQuantity,*/}
                                {/*}}>{quantities[0]} </Typography.Paragraph>*/}
                            </Col>
                        </Col>
                    </Row>
                    <Divider />

                    <Row>
                        <Col span={6}><h3 style={style}>Product Image</h3></Col>
                        <Col span={6}><Title level = {4}>{productNames[1]}</Title></Col>
                        <Col span={4} />
                        <Col span={8}><Col><Title level = {5}>${prices[1] * quantities[0]}</Title></Col>
                            <Col><Title level = {5}>Quantity: {quantities[1]}</Title></Col>
                            {/*<Select*/}
                            {/*    defaultValue={quantities[0]}*/}
                            {/*    style={{*/}
                            {/*        width: 120,*/}
                            {/*    }}*/}
                            {/*    onChange={handleChange}*/}
                            {/*    options={QUANTITY}*/}
                            {/*/>*/}
                            {/*</Col>*/}
                        </Col>
                    </Row>

                </Col>


                <Col span={2}>

                </Col>
                <Col className="gutter-row" span={6}>
                    <div>
                        <Title level = {4}>
                            Subtotal: {quantities[0] * prices[0] + quantities[1] * prices[1]}
                            <Divider dashed />
                            Shipping: TBD
                        </Title>
                    </div>

                    <Divider />

                    <div>
                        <Title level = {4}>
                            Estimated Total: TBD
                        </Title>
                    </div>
                    <Divider />
                    <Button
                        block
                        type='primary'
                        onClick={() => navigate('/checkout')}
                    >
                        Checkout
                    </Button>
                    <Divider />
                </Col>
            </Row>
        </div>
        </div>
    )
};

export default Cart;