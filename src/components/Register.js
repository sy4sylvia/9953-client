import React from 'react';
import { AutoComplete, Button, Col, Form, Input, Card, Row, Select} from 'antd';
import _ from 'lodash';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Country, State }  from 'country-state-city';

import { MARKET, REGION, QUESTIONS } from './Options';

import 'antd/dist/antd.css';
import '../index.css';

const Register = () => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const questionChildren = [];

    const marketChildren = [];
    const regionChildren = [];

    const countryChildren = [];
    const stateChildren = [];

    _.forEach(MARKET, (market) => {
        marketChildren.push(<Option value={market.label}> {market.key} </Option>);
    });

    _.forEach(REGION, (market) => {
        regionChildren.push(<Option value={market.label}> {market.key} </Option>);
    });

    _.forEach(Country.getAllCountries(), (country) => {
        countryChildren.push(<Option value={country.name}> {country.name} </Option>);
    })

    _.forEach(State.getAllStates(), (state) => {
        stateChildren.push(<Option value={state.name}> {state.name} </Option>);
    })

    _.forEach(QUESTIONS, (question) => {
        questionChildren.push(<Option value={question.label}> {question.key} </Option>);
    });

    const navigate = useNavigate();

    const handleSelectChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    const submitRegisterForm = (values) => {
        values = Object.assign({'isPrimary': 'Y'}, values);
        values = Object.assign({'segment': 'Consumer'}, values);

        delete values.password2;

        axios.post('http://localhost:8080/api/admin/customer', values).then(function (response) {
            console.log('response from the backend', response);
            if (response.status === 200) {
                alert('You have successfully registered!');
                navigate('/login');
            } else {
                alert('Missing info');
            }
        }).catch(function (error) {
            console.log(error);
            alert(error);
        });
    };


    return (
        <Card
            className='card-form-wrapper'
            title='Register'
        >
            <Form
                className='form-inside-card'
                form={form}
                layout='vertical'
                onFinish={submitRegisterForm}
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            label='First Name'
                            name='firstName'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your first name.'
                                }
                            ]}
                        >
                        <Input type = 'textarea' />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='Last Name'
                        name='lastName'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name.'
                            }
                        ]}
                    >
                        <Input type = 'textarea' />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label='Email'
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'Please input your email.'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label='Password'
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Please input your password.'
                    },
                    () => ({
                        validator(_, value) {
                            if (value.length >= 8 && value.length < 20) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The length of the password must be between 8 and 20'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label='Confirm Password'
                name='password2'
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password.'
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error('Passwords do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label='Security Question'
                name='securityQuestion'
                rules={[
                    {
                        required: true,
                        message: 'Please choose your security question.'
                    }
                ]}
            >
                <Select
                    size={'middle'}
                    defaultValue='Security Question'
                    onChange={handleSelectChange}
                >
                    {questionChildren}
                </Select>
            </Form.Item>

            <Form.Item
                label='Security Answer'
                name='securityAnswer'
                rules={[
                    {
                        required: true,
                        message: 'Please input your answer for the security question.'
                    }
                ]}
            >
                <Input type='textarea' />
            </Form.Item>
                <Row gutter={8}>
                <Col span={12}>
                <Form.Item
                    label='Market'
                    name='market'
                    rules={[
                        {
                            required: true,
                            message: 'Please choose your market.'
                        }
                    ]}
                >
                    <Select
                        size={'middle'}
                        defaultValue='Market'
                        onChange={handleSelectChange}
                    >
                        {marketChildren}
                    </Select>
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item
                    label='Region'
                    name='region'
                    rules={[
                        {
                            required: true,
                            message: 'Please choose your region.'
                        }
                    ]}
                >
                    <Select
                        size={'middle'}
                        defaultValue='Region'
                        onChange={handleSelectChange}
                    >
                        {regionChildren}
                    </Select>
                </Form.Item>
                </Col>
                </Row>

                <Row gutter={8}>
                <Col span={12}>
                <Form.Item
                    label='Country'
                    name='country'
                    rules={[
                        {
                            required: true,
                            message: 'Please choose your country.'
                        }
                    ]}
                >
                    <AutoComplete
                        size={'middle'}
                        defaultValue=''
                        onChange={handleSelectChange}
                    >
                        {countryChildren}
                    </AutoComplete>
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item
                    label='State'
                    name='state'
                    rules={[
                        {
                            required: true,
                            message: 'Please choose your state.'
                        }
                    ]}
                >
                    <AutoComplete
                        size={'middle'}
                        defaultValue=''
                        onChange={handleSelectChange}
                    >
                        {stateChildren}
                    </AutoComplete>
                </Form.Item>
                </Col>
                </Row>

                <Row gutter={8}>
                    <Col span={12}>
                <Form.Item
                    label='City'
                    name='city'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your city.'
                        }
                    ]}
                >
                    <Input type = 'textarea'/>
                </Form.Item>
                    </Col>
                    <Col span={12}>
                <Form.Item
                    label='Postal Code'
                    name='postalCode'
                    rules={[
                        {
                            required: false,
                            message: 'Please input the postal code.'
                        }
                    ]}
                >
                    <Input type = 'textarea'/>
                </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Register
                    </Button>
                </Form.Item>

        </Form>
        </Card>
    );
};

export default Register;