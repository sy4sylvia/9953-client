import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import 'antd/dist/antd.css';
import '../index.css';

const changePasswordURL = 'http://localhost:8080/api/admin/customer/change-password';

const ChangePassword = () => {
    localStorage.clear();

    const navigate = useNavigate();
    const { resetToken } = useParams();
    console.log(resetToken);

    // TODO: fix the 401 error, no bearer token in this case
    const onResetPassword = (values) => {
        delete values.passwordDuplicate;
        values = Object.assign({resetToken}, values);
        console.log(values);

        axios.post(changePasswordURL, values).then(function (response) {
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

export default ChangePassword;