import React, {useState} from 'react';
import {Breadcrumb, Button, Card, Col, Divider, Radio, Row, Space, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';

const { Title } = Typography;

const Checkout = () => {

    const [radioVal, setRadioVal] = useState(1);
    const onChangeRadio = (e) => {
        console.log('radio checked', e.target.value);
        setRadioVal(e.target.value);
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
                    <Breadcrumb.Item href="">Address Info</Breadcrumb.Item>
                    {/*<Breadcrumb.Item href="">Shipping</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item>Payment</Breadcrumb.Item>*/}
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
                        {/*first row, title of shipping address*/}
                        <Row>
                            <Col span={8}>
                                <Title level={3}>
                                    Shipping Address
                                </Title>

                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Radio.Group onChange={onChangeRadio} value={radioVal}>
                                    <Space direction='vertical'>
                                        <Radio value={1}>
                                            <Title level={5}>Same Day</Title>
                                        </Radio>

                                        <Card
                                            style={{
                                                left: '50px',
                                                width: 200,
                                                textAlign: 'left',
                                            }}
                                        >
                                            <p>xx@gmail.com</p>
                                            <p>Justin Ritter</p>
                                            <p>Wollongong, New South Wales</p>
                                            <p>Australia</p>
                                            <p>Oceania</p>
                                            <p>Asia Pacific</p>
                                        </Card>

                                        <Radio value={2}>
                                            <Title level={5}>Add New Address</Title>
                                            {/*TODO: add the new address modal here*/}
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Col>

                            <Col span={6} />
                            <Col span={4}>

                                <Button
                                    style={{
                                        position: 'absolute',
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
                                        bottom: 0,
                                    }}
                                    onClick={() => gotoPage('/shipping-mode')}
                                >
                                    Continue to shipping
                                </Button>

                            < /Col>
                        </Row>
                        <Divider />
                    </Col>

                    <Col className="gutter-row" span={6}>
                        <div>
                            <Title level = {4}>
                                Subtotal:
                                <Divider dashed />
                                Shipping: TBD
                            </Title>
                        </div>

                        <Divider />

                        <div>
                            <Title level = {3}>
                                Estimated Total:
                            </Title>
                        </div>
                        <Divider />
                    </Col>
                </Row>
            </div>
        </div>

    );
}

export default Checkout;

