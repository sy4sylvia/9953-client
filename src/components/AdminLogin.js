import React from 'react';
import { Button, Form, Input, Card } from 'antd';
import {useNavigate} from 'react-router-dom';

import 'antd/dist/antd.css';
import '../index.css';

// construct the username and login token map for the admin
// hard-coded on the frontend side
const adminMap = new Map();
adminMap.set('Admin_A', 'SCq8oXiJAF');
adminMap.set('Admin_B', '5P5CyHorLP');
adminMap.set('Admin_C', '38RBtD7l7O');
adminMap.set('Admin_D', 'cvt7yuk0N1');
adminMap.set('Admin_E', 'bjkm9ArUlo');

const AdminLogin = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const submitAdminLoginForm = (values) => {
        if (!adminMap.has(values.username)) {
            alert('Invalid username, please try again.');
        } else {
            if (adminMap.get(values.username) !== values.loginToken) {
                alert('Wrong login token, please try again.');
            } else {
                // successfully log in, direct to the page to change the stock of a product
                localStorage.setItem('admin', values.username)
                navigate('/update-product');
            }
        }
    }


    return (
        <Card
            className='card-form-wrapper'
            title='Admin Log In'
        >
            <Form
                className='form-inside-card'
                form={form}
                layout='vertical'
                onFinish={submitAdminLoginForm}
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    label='Username'
                    name='username'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username.'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Login Token'
                    name='loginToken'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your login token.'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Log In
                    </Button>
                </Form.Item>

            </Form>
        </Card>
    );
};

export default AdminLogin;
