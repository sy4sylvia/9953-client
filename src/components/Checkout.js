import React, {useState} from 'react';
import {Breadcrumb, Button, Card, Col, Divider, Radio, Row, Space, Typography} from 'antd';
import { ProfileOutlined  } from '@ant-design/icons';

const { Title } = Typography;

const Checkout = () => {

    const [radioVal, setRadioVal] = useState(1);
    const onChangeRadio = (e) => {
        console.log('radio checked', e.target.value);
        setRadioVal(e.target.value);
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
                                    Shipping Address <ProfileOutlined />
                                </Title>

                            </Col>
                        </Row>

                        <Row>
                            <Col span={6}>
                                <Radio.Group onChange={onChangeRadio} value={radioVal}>
                                    <Space direction='vertical'>
                                        <Radio value={1}>
                                            <Title level={5}>Primary Address</Title>
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
                                            <Title level={5}>Add New  Address</Title>
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Col>

                            <Col span={6}>
                            </Col>
                            <Col span={4} />
                            <Col span={8}>
                            </Col>
                        </Row>
                        <Divider />
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
                                Estimated Total:
                            </Title>
                        </div>
                        <Divider />


                        <Button
                            block
                            type='primary'
                            // onClick={() => gotoPage('/checkout')}
                        >
                            Checkout
                        </Button>
                        <Divider />
                    </Col>
                </Row>
            </div>



        </div>

    );
}

export default Checkout;

