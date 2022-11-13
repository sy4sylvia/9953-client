import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import 'antd/dist/antd.css';
import '../index.css';

import changePasswordURL from '../services/api';

const ChangePassword = () => {
    const navigate = useNavigate();

    // TODO: grab the token from the URL and add it as part of the JSON and send back to backend
    const onChangePassword = (values) => {
        axios.post(changePasswordURL, values).then(function (response) {
            console.log(response);
            if (response.status === 200) {
                // TODO: get the lastName and firstName from the backend and display on the frontend
                // TODO: get the customer ID and retrieve token
                navigate('/'); // navigate to the home page
            } else {
                alert("Wrong account or password.");
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
              title='Change Password'
        >
        <Form
            className='form-inside-card'
            layout='vertical'
            onFinish={onChangePassword}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label='New Password'
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Please input your new password.'
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>

            {/*TODO: add messages when the passwords don't match*/}
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

            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Reset Password
                </Button>
            </Form.Item>
        </Form>
        </Card>
    );
};

export default ChangePassword;