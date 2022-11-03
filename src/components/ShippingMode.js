import React, {useState} from 'react';
import {Breadcrumb, Button, Col, Divider, Radio, Row, Space, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { Title } = Typography;

const ShippingMode = () => {

    const [shippingModeVal, setShippingModeVal] = useState(0);
    const [priorityVal, setPriorityVal] = useState(4);

    const onChangeMode = (e) => {
        console.log('radio checked', e.target.value);
        setShippingModeVal(e.target.value);
    };

    const onChangePriority = (e) => {
        console.log('radio checked', e.target.value);
        setPriorityVal(e.target.value);
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
                        <Row>
                            <Col span={8}>
                                <Row>
                                    <Title level={3}>
                                        Shipping Mode
                                    </Title>
                                </Row>

                                <Radio.Group
                                    onChange={onChangeMode}
                                    value={shippingModeVal}
                                    style={{ textAlign: 'left'}}
                                >
                                    <Space direction='vertical'>
                                        <Radio value={0}>
                                            <Title level={5}>Critical</Title>
                                        </Radio>

                                        <Radio value={1}>
                                            <Title level={5}>High</Title>
                                        </Radio>

                                        <Radio value={2}>
                                            <Title level={5}>Medium</Title>
                                        </Radio>

                                        <Radio value={3}>
                                            <Title level={5}>Low</Title>
                                        </Radio>
                                    </Space>
                                </Radio.Group>

                                <Space />
                                <Divider dashed />
                                <Row>
                                    <Title level={3}>
                                        Order Priority <ExclamationCircleFilled />
                                    </Title>
                                </Row>

                                <Radio.Group
                                    onChange={onChangePriority}
                                    value={priorityVal}
                                    style={{ textAlign: 'left'}}
                                >
                                    <Space direction='vertical'>
                                        <Radio value={4}>
                                            <Title level={5}>Same Day</Title>
                                        </Radio>

                                        <Radio value={5}>
                                            <Title level={5}>First Class</Title>
                                        </Radio>

                                        <Radio value={6}>
                                            <Title level={5}>Second Class</Title>
                                        </Radio>

                                        <Radio value={7}>
                                            <Title level={5}>Standard Class</Title>
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Col>

                            <Col span={4} />
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
                                    onClick={() => gotoPage('/payment')}
                                >
                                    Continue to payment
                                </Button>

                            < /Col>
                        </Row>
                        <Divider />
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

export default ShippingMode;

