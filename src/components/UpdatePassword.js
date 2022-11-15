import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import 'antd/dist/antd.css';
import '../index.css';

const updatePasswordURL = 'http://localhost:8080/api/admin/customer/update-password';

const UpdatePassword = () => {
    const navigate = useNavigate();

    console.log('token', localStorage.getItem('authorization'));

    const onUpdatePassword = (values) => {
        // Set the bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

        const curCustomerId = localStorage.getItem('customerId');
        values = Object.assign({'customerId': curCustomerId}, values);

        delete values.passwordDuplicate;

        console.log(values);

        axios.put(updatePasswordURL, values).then(function (response) {
            console.log(response);
            if (response.status === 200) {
                navigate('/account'); // navigate to the home page
            } else {
                alert('Failed');
            }
        }).catch(function (error) {
            console.log(error);
            alert(error);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card className='card-form-wrapper'
              title='Update Password'
        >
        <Form
            className='form-inside-card'
            layout='vertical'
            onFinish={onUpdatePassword}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label='Old Password'
                name='oldPassword'
                rules={[
                    {
                        required: true,
                        message: 'Please input your new password.'
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label='New Password'
                name='newPassword'
                rules={[
                    {
                        required: true,
                        message: 'Please input your new password.'
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label='Confirm New Password'
                name='passwordDuplicate'
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password.'
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
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

            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Reset Password
                </Button>
            </Form.Item>
        </Form>
        </Card>
    );
};

export default UpdatePassword;