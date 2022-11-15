import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

import axios from 'axios';

import 'antd/dist/antd.css';
import '../index.css';

const changePasswordURL = 'http://localhost:8080/api/admin/customer/change-password';

const ChangePassword = () => {
    localStorage.clear();
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();
    const tokenFromEmail = searchParams.get('token')

    //Set the new bearer token
    localStorage.setItem('authorization', tokenFromEmail);

    const onResetPassword = (values) => {
        delete values.passwordDuplicate;
        values = Object.assign({'resetToken': tokenFromEmail}, values);
        console.log(values);

        axios.post(changePasswordURL, values).then(function (response) {
            console.log(response);
            if (response.status === 200) {
                navigate('/'); // navigate to the home page
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
              title='Change Password'
        >
            <Form
                className='form-inside-card'
                layout='vertical'
                onFinish={onResetPassword}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label='New Password'
                    name='newPassword'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password.'
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

export default ChangePassword;