import React from 'react';
import {Button, Card, Form, Input} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'antd/dist/antd.css';
import '../index.css';

const forgotPasswordURL = 'http://localhost:8080/api/admin/customer/forgot-password';

// TODO:change to input link only and send email
const ForgotPassword = () => {
    localStorage.clear();

    const [form] = Form.useForm();

    const navigate = useNavigate();

    const submitEmail = (values) => {
        console.log(values);
        // TODO: POST, if 200
        navigate('/change-password');
    }

    const onCreate = (values) => {
        values = Object.assign({ 'clientUri':'http://localhost:3000/change-password'}, values);
        // TODO: ask the backend to throw an error when the email is not registered
        axios.post(forgotPasswordURL, values)
            .then((response) => {
            console.log(response);
            if (response.status === 200) {
                navigate('/change-password');
            } else {
                alert('No such email');
            }
        }).catch(function (error) {
            console.log(error);
            alert(error);
        });
    };

    return (
        <Card
            className='card-form-wrapper'
            title='Forgot Password'
        >
            <Form
                className='form-inside-card'
                form={form}
                layout='vertical'
                onFinish={submitEmail}
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

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Send Link to Email
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ForgotPassword;