import React from 'react';
import {Button, Form, Input, Select, Card, Tooltip, Typography} from 'antd';
import _ from 'lodash';

import 'antd/dist/antd.css';
import '../index.css';

import {QUESTIONS} from './Options';

const Login = () => {
    const [form] = Form.useForm();
    const { Option } = Select;

    const submitLoginForm = (values) => {
        console.log(values);
        // TODO: POST
    }

    const children = [];
    _.forEach(QUESTIONS, function (pair) {
        children.push(<Option value={pair.label}> {pair.key} </Option>);
    });

    const handleSelectChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    return (
        <Card
            className='card-form-wrapper'
            title='Sign In'
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

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Sign In
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
