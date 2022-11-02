import React  from 'react';
import { Typography, Select, Button, Row, Col, Divider } from 'antd';

import 'antd/dist/antd.css';

import { QUANTITY } from './Options';
import {useNavigate} from "react-router-dom";

const { Title } = Typography;

const Cart = () => {

    const style = {
        background: '#0092ff',
        height: '120px',
        padding: '8px 0',
        textAlign: 'center',
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const navigate = useNavigate();

    const gotoPage = (path) => {
        navigate(path);
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
                <Col className="gutter-row" span={16}>
                    <Row>
                        <Col span={6}>
                            <h3 style={style}>Product Image</h3>
                        </Col>
                        <Col span={6}>
                            <Title level = {4}>
                                Stool, Red
                            </Title>
                        </Col>
                        <Col span={4} />
                        <Col span={8}>
                            <Col>
                                <Title level = {5}>
                                    $155
                                </Title>
                            </Col>
                            <Col style={{
                                right: '5px',
                                width: '20%'}}>

                                <Row>
                                    <Col style={{left: '20px', width: '80%'}}>
                                        Quantity:
                                    </Col>
                                    <Col span ={1}>
                                        {/*TODO: this quantity should be retrieved from */}
                                        {/*previous add to cart action*/}
                                        <Select
                                            defaultValue='1'
                                            style={{
                                                left: '50px',
                                                right: 0,
                                            }}
                                            onChange={handleChange}
                                            options={QUANTITY}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                    <Divider />

{/*Repetitive codes:*/}
                    <Row>
                        <Col span={6}>
                            <h3 style={style}>Product Image</h3>
                        </Col>
                        <Col span={6}>
                            <Title level = {4}>
                                Stool, Red
                            </Title>
                        </Col>
                        <Col span={4} />
                        <Col span={8}>
                            <Col>
                                <Title level = {5}>
                                    $255
                                </Title>
                            </Col>
                            <Col style={{
                                right: '5px',
                                width: '20%'}}>

                                <Row>
                                    <Col style={{left: '20px', width: '80%'}}>
                                        Quantity:
                                    </Col>
                                    <Col span ={1}>
                                        {/*TODO: this quantity should be retrieved from */}
                                        {/*previous add to cart action*/}
                                        <Select
                                            defaultValue='1'
                                            style={{
                                                left: '50px',
                                                right: 0,
                                            }}
                                            onChange={handleChange}
                                            options={QUANTITY}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                    <Divider />
                </Col>


                <Col span={2}>

                </Col>
                <Col className="gutter-row" span={6}>
                    <div>
                        <Title level = {4}>
                            Subtotal:
                            <Divider dashed />
                            Shipping:
                        </Title>
                    </div>

                    <Divider />

                    <div>
                        <Title level = {3}>
                            Estimated Total
                        </Title>
                    </div>
                    <Divider />


                    <Button
                        block
                        type='primary'
                        onClick={() => gotoPage('/checkout')}
                    >
                        Checkout
                    </Button>
                    <Divider />
                </Col>
            </Row>
        </div>
    )
};

export default Cart;