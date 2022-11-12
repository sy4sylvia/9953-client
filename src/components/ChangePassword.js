import React from 'react';
import { Button, Card, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
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
                navigate('/');
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
        <Card style={{
            textAlign: 'center',
            width: 600 }}
              title='Change Password'
        >
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onChangePassword}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
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
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type='primary' htmlType='submit'>
                    Reset Password
                </Button>
            </Form.Item>
        </Form>
        </Card>
    );
};

export default ChangePassword;