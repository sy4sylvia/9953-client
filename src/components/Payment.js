import React, {useState} from 'react';
import {Breadcrumb, Button, Input, Col, Divider, Radio, Row, Space, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';
import {CreditCardFilled, EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';

const { Title } = Typography;

const Payment = () => {

    const [addressVal, setAddressVal] = useState(0);

    const onChangeAddress = (e) => {
        console.log('radio checked', e.target.value);
        setAddressVal(e.target.value);
    };

    const navigate = useNavigate();

    const gotoPage = (path) => {
        navigate(path);
    };
    return (
        <div>
            <div style={{padding: '40px 60px 0 60px'}} >
                <Breadcrumb separator=">">
                    <Breadcrumb.Item href='/cart' >Cart</Breadcrumb.Item>
                    <Breadcrumb.Item href="/checkout">Address Info</Breadcrumb.Item>
                    <Breadcrumb.Item href='/shipping-mode'>Shipping</Breadcrumb.Item>
                    <Breadcrumb.Item href='/payment '>Payment</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div style={{padding: '80px 120px'}} >
                <Row
                    gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                    }}
                >
                    <Col className="gutter-row" span={16}>
                        {/*TODO: add extra spacing*/}
                        <Row>
                            <Col span={16}>
                                <Row>
                                    <Title level={3}>
                                        Payment <CreditCardFilled />
                                    </Title>
                                </Row>
                                <Row>
                                    <Title level={4}>Payment Method</Title>
                                </Row>
                                <Row>
                                    <Input placeholder='Card Number'></Input>
                                </Row>


                                <Space direction="horizontal">
                                <Row>
                                    <Input
                                        placeholder='Name on card'
                                        style={{
                                            width: '34%',
                                        }}
                                    ></Input>
                                    <Input
                                        placeholder='MM/YY'
                                        style={{
                                            width: '33%',
                                        }}
                                    ></Input>

                                    <Input.Password
                                        placeholder='CVV'
                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        style={{
                                            width: '33%',
                                        }}
                                    />

                                </Row>
                                </Space>

                                <Divider />
                                <Row>
                                    <Title level={4}>Billing Address</Title>
                                </Row>

                                <Row>
                                    <Radio.Group
                                        onChange={onChangeAddress}
                                        value={addressVal}
                                        style={{ textAlign: 'left'}}
                                    >
                                        <Space direction='vertical'>
                                            <Radio value={0}>
                                                <Title level={5}>Same as shipping address</Title>
                                            </Radio>
                                            {/*TODO: if this radio is set, expand a form*/}
                                            <Radio value={1}>
                                                <Title level={5}>Use a different billing address</Title>
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </Row>

                                <Col span={4}>
                                    <Button
                                        style={{
                                            position: 'absolute',
                                            left: 50,
                                            top:30,
                                            bottom: 0,
                                        }}
                                        type='default'
                                        onClick={() => gotoPage('/cart')}
                                    >
                                        Return to cart
                                    </Button>
                                </Col>

                                <Col span={8}>
                                    <Button
                                        type='primary'
                                        style={{
                                            position: 'absolute',
                                            left: 400,
                                            top:30,
                                            bottom: 0,
                                        }}
                                        onClick={() => gotoPage('/order')}
                                    >
                                        Place Order
                                    </Button>
                                < /Col>
                            </Col>
                        </Row>
                    </Col>

                    <Col className="gutter-row" span={6}
                    >
                        <div>
                            <Title level={4}>Summary</Title>
                            <Divider />
                            <Title level = {5}>
                                Subtotal: $mock
                                <Divider dashed />
                                Shipping: $mock
                                <Space />
                                <Divider />
                                Total: $mock
                            </Title>
                        </div>

                        <Divider />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Payment;

