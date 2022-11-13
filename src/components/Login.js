import React from 'react';
import {Button, Form, Input, Select, Card, Tooltip, Typography} from 'antd';
import _ from 'lodash';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import 'antd/dist/antd.css';
import '../index.css';

import {QUESTIONS} from './Options';

const Login = () => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const navigate = useNavigate();

    const submitLoginForm = (values) => {
        console.log(values);
        axios
            .post('http://localhost:8080/api/auth/customer/login', values)
            .then(function (response) {
                console.log('status code here: ', response.status);
                if (response.status === 200) {
                    navigate('/');
                }
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    alert('Wrong password or security answer.');
                } else {
                    alert(error);
                }
            });
    }

    const questionChildren = [];
    _.forEach(QUESTIONS, function (pair) {
        questionChildren.push(<Option value={pair.label}> {pair.key} </Option>);
    });

    const handleSelectChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    return (
        <Card
            className='card-form-wrapper'
            title='Log In'
        >
            <Form
                className='form-inside-card'
                form={form}
                layout='vertical'
                onFinish={submitLoginForm}
                initialValues={{
                    modifier: 'public',
                }}
            >
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

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Log In
                    </Button>
                </Form.Item>

                <Tooltip title='Click to reset password'>
                    <Typography.Link href='/forgot-password'>
                        Forgot Password
                    </Typography.Link>
                </Tooltip>

            </Form>
        </Card>
    );
};

export default Login;
