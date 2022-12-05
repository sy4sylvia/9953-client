import React, {useState} from 'react';
import { Button, Input, Col, Divider, Form, Radio, Row, Space, Typography, Card} from 'antd';
import {useNavigate} from 'react-router-dom';
import {CreditCardFilled, ExclamationCircleFilled} from '@ant-design/icons';
import axios from "axios";

const { Title } = Typography;

const addressBaseURL = 'http://localhost:8080/api/admin/customer/address';
const cartBaseURL = 'http://localhost:8080/api/cart/';
const orderURL = 'http://localhost:8080/api/order';

const curCustomerId = localStorage.getItem('customerId');

// TODO: on this page, Get product and include these values in the order
const Payment = () => {

    const navigate = useNavigate();

    const [form] = Form.useForm();

    // get primary address
    let values = null;
    const [data, setData] = useState(null);
    const [cart, setCart] = useState(null);

    const postalCodes = [];
    const cities = [];
    const states = [];
    const countries = [];
    const regions = [];
    const markets = [];
    const primaryOptions = [];
    console.log(localStorage.getItem('authorization'))
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

    if (data === null) {
        axios.get(addressBaseURL, {params: {customerId: curCustomerId}})
            .then(function (response) {
                console.log('response from the backend', response);
                if (response.status === 200) {
                    console.log(response.data);
                    setData(response.data);
                } else {
                    alert('Invalid Info');
                    navigate('/login');
                }
            }).catch(function (error) {
            console.log(error);
            alert(error);
        });
    }

    if (data !== null) {
        for (let i = 0; i < data.length; i++) {
            postalCodes.push(data[i].postalCode);
            cities.push(data[i].city);
            states.push(data[i].state);
            countries.push(data[i].country);
            regions.push(data[i].region);
            markets.push(data[i].market);
            primaryOptions.push(data[i].isPrimary);
        }
    }

    let primaryIdx = 0;
    for (let i = 0; i < primaryOptions.length; i++) {
        if (primaryOptions[i] === 'Y') {
            primaryIdx = i;
            break;
        }
    }

    const getProductsFromCart = () => {
        axios.get(cartBaseURL + curCustomerId)
            .then(function (response) {
                console.log('response from the backend', response);
                if (response.status === 200) {
                    console.log(response.data);
                    setCart(response.data);
                } else {
                    alert('Invalid Info');
                    navigate('/login');
                }
            }).catch(function (error) {
            console.log(error);
            alert(error);
        });
    }

    if (cart === null) {
        getProductsFromCart();
        // TODO: we only need the productId and the quantity here
    } else {
        for (let i = 0; i < cart.length; i++) {
            delete cart[i].discount;
            delete cart[i].productName;
            delete cart[i].unitPrice;
        }
        values = Object.assign({'productQuantityList': cart}, values);
    }
    console.log('cart', cart);

    const [radioVal, setRadioVal] = useState(1);
    const onChangeRadio = (e) => {
        console.log('radio checked', e.target.value);
        setRadioVal(e.target.value);
        //TODO: if the 2nd radio is checked, create a modal with form?
    };

    const [addressVal, setAddressVal] = useState(0);
    const onChangeAddress = (e) => {
        console.log('radio checked', e.target.value);
        setAddressVal(e.target.value);
    };

    const [shippingModeVal, setShippingModeVal] = useState(0);
    const [priorityVal, setPriorityVal] = useState(4);

    const onChangeMode = (e) => {
        console.log('mode radio checked', e.target.value);
        setShippingModeVal(e.target.value);
    };

    const onChangePriority = (e) => {
        console.log('radio checked', e.target.value);
        setPriorityVal(e.target.value);
    };

    const submitPaymentForm = (paymentValues) => {
        values = Object.assign(paymentValues, values);
    };


    const handlePlaceOrder = () => {
        values = Object.assign({'customerId': curCustomerId}, values)
        values = Object.assign({'orderPriority': priorityVal}, values)
        values = Object.assign({'shipMode': shippingModeVal}, values)
        values = Object.assign({'isReturned': 'N'}, values);


        values = Object.assign({'postalCode': postalCodes[primaryIdx]}, values)
        values = Object.assign({'city': cities[primaryIdx]}, values)
        values = Object.assign({'state': states[primaryIdx]}, values);
        values = Object.assign({'region': regions[primaryIdx]}, values);
        values = Object.assign({'country': countries[primaryIdx]}, values);
        values = Object.assign({'market': markets[primaryIdx]}, values);

        console.log(values);

        axios.post(orderURL, values)
            .then(function (response) {
                console.log('response from the backend', response);
                if (response.status === 200) {
                    console.log(response.data);
                    setData(response.data);
                    navigate('/');
                } else {
                    alert('Invalid Info');
                    navigate('/login');
                }
            }).catch(function (error) {
            console.log(error);
            alert(error);
        });

        // values = Object.assign({'orderPriority': priorityVal}, values)
    }

    return (
        <div>
            <div style={{padding: '80px 120px'}} >
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32, }}>
                    <Col className="gutter-row" span={24}>
                        {/*first row, title of shipping address*/}
                        <Row>
                            <Col span={8}>
                                <Title level={3}>
                                    Shipping Address
                                </Title>
                            </Col>
                            {/*<Col span={4}/> */}
                            <Col span={8}>
                                <Title level={3} style={{paddingBottom: '3%'}}>
                                    Ship Mode
                                </Title>
                            </Col>
                            <Col span={8}>
                                <Title level={3}>
                                    Order Priority <ExclamationCircleFilled />
                                </Title>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={8}>
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
                                            Postal Code: {postalCodes[primaryIdx]}<br/>
                                            City: {cities[primaryIdx]} <br/>
                                            State: {states[primaryIdx]} <br/>
                                            Country: {countries[primaryIdx]} <br/>
                                            Market: {markets[primaryIdx]} <br/>
                                            Region: {regions[primaryIdx]} <br/>
                                        </Card>

                                        <Radio value={2}>
                                            <Title level={5}>Add New Address</Title>
                                            {/*TODO: add the new address modal here*/}
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Col>

                            <Col span={8}>
                                <Radio.Group
                                    onChange={onChangeMode}
                                    value={shippingModeVal}
                                    style={{ textAlign: 'left'}}
                                >
                                    <Space direction='vertical'>
                                        <Radio value={'Same Day'}>
                                            <Title level={5}>Same Day</Title>
                                        </Radio>

                                        <Radio value={'First Class'}>
                                            <Title level={5}>First Class</Title>
                                        </Radio>

                                        <Radio value={'Second Class'}>
                                            <Title level={5}>Second Class</Title>
                                        </Radio>

                                        <Radio value={'Standard Class'}>
                                            <Title level={5}>Standard Class</Title>
                                        </Radio>
                                    </Space>

                                </Radio.Group>
                            </Col>

                            <Col span={8}>
                                <Radio.Group
                                    onChange={onChangePriority}
                                    value={priorityVal}
                                    style={{ textAlign: 'left'}}
                                >
                                    <Space direction='vertical'>
                                        <Radio value={'Critical'}>
                                            <Title level={5}>Critical</Title>
                                        </Radio>

                                        <Radio value={'High'}>
                                            <Title level={5}>High</Title>
                                        </Radio>

                                        <Radio value={'Medium'}>
                                            <Title level={5}>Medium</Title>
                                        </Radio>

                                        <Radio value={'Low'}>
                                            <Title level={5}>Low</Title>
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </Col>

                        </Row>

                        <Divider />
                    </Col>


                    <Col className="gutter-row" span={24}>
                        <Row>
                            <Col span={6}>
                                <Title level={3}>
                                    Payment <CreditCardFilled />
                                </Title>
                            </Col>
                            <Col span={6}/>
                            <Col span={12}>
                                <Title level={3} style={{paddingBottom: '3%'}}>
                                    Billing Address
                                </Title>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={16}>
                                <Row>
                                    <Col span={2} />
                                    <Form
                                        className='form-inside-card'
                                        form={form}
                                        layout='vertical'
                                        onFinish={submitPaymentForm}
                                        initialValues={{
                                            modifier: 'public',
                                        }}
                                    >
                                        <Row gutter={8}>
                                            <Col span={12}>
                                                <Form.Item
                                                    label='MM/YY'
                                                    name='creditCardExpiredDate'
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input the expired date.'
                                                        }
                                                    ]}
                                                >
                                                    <Input type = 'textarea' />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label='CVV'
                                                    name='creditCardCvv'
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input the cvv.'
                                                        }
                                                    ]}
                                                >
                                                    <Input.Password />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Form.Item
                                            label='Card Holder Name'
                                            name='creditCardHolder'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input the card holder name.'
                                                }
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label='Card Number'
                                            name='creditCardNumber'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your answer for the security question.'
                                                }
                                            ]}
                                        >
                                            <Input type='textarea' />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type='primary' htmlType='submit'>
                                                Confirm
                                            </Button>
                                        </Form.Item>
                                    </Form>

                                </Row>
                            </Col>
                            <Col span={8}>
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
                            </Col>

                        </Row>
                        <Divider />
                    </Col>


                    <Col className="gutter-row" span={24}>
                        <Row>
                            <Col span={4} />
                            <Col span={4}>
                                <Button
                                    style={{
                                        position: 'absolute',
                                        left: 50,
                                        top:30,
                                        bottom: 0,
                                    }}
                                    type='default'
                                    onClick={() => navigate('/cart')}
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
                                    onClick={handlePlaceOrder}
                                >
                                    Place Order
                                </Button>
                            < /Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Payment;

