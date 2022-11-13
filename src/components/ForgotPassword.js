import React from 'react';
import {Button, Card, Form, Input} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'antd/dist/antd.css';
import '../index.css';

import forgotPasswordURL from '../services/api';

// TODO:change to input link only and send email
const ForgotPassword = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();

    const submitEmail = (values) => {
        console.log(values);
        // TODO: POST, if 200
        navigate('/change-password');
    }

    const onCreate = (values) => {
        axios.post(forgotPasswordURL, values).then(function (response) {
            console.log(response);
            if (response.status === 200) {
                // TODO: get the lastName and firstName from the backend and display on the frontend
                // TODO: get the customer ID and retrieve token
                navigate('/change-password');
            } else {
                alert("Wrong account or password.");
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