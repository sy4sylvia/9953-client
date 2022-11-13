import React from 'react';
import { Button, Col, Form, Input, Card, Row, Select} from 'antd';
import _ from 'lodash';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import { QUESTIONS } from './Options';

import 'antd/dist/antd.css';
import '../index.css';

const Register = () => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const children = [];

    const marketChildren = [];
    const regionChildren = [];
    const countryChildren = [];
    const stateChildren = [];

    // TODO: these items should be retrieved from the database
    marketChildren.push(<Option value="dummy">dummy</Option>); //dummy example
    regionChildren.push(<Option value="lucy">lucy</Option>); //dummy example
    countryChildren.push(<Option value='Australia'>Australia</Option>);
    stateChildren.push(<Option value='California'>California</Option>);

    const navigate = useNavigate();

    _.forEach(QUESTIONS, function (pair) {
        children.push(<Option value={pair.label}> {pair.key} </Option>);
    });

    const handleSelectChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    const submitRegisterForm = (values) => {
        console.log(values);
        values = Object.assign({'isPrimary': 'Y'}, values);

        console.log(values);

        // TODO: fix the 404 error
        axios.post('http://localhost:8080/api/admin/customer', values).then(function (response) {
            console.log(response);
            if (response.status === 200) {
                navigate('/');
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
            title='Sign Up'
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
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>

            {/*TODO: add messages when the passwords don't match*/}
            <Form.Item
                label='Re-type Password'
                name='rePassword'
                rules={[
                    {
                        required: true,
                        message: 'Please retype your password.'
                    }
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
                    initialValues='Security Question'
                    onChange={handleSelectChange}
                >
                    {children}
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
                    <Select
                        size={'middle'}
                        defaultValue='Country'
                        onChange={handleSelectChange}
                    >
                        {countryChildren}
                    </Select>
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
                    <Select
                        size={'middle'}
                        defaultValue='State'
                        onChange={handleSelectChange}
                    >
                        {stateChildren}
                    </Select>
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