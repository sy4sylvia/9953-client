import React from 'react';
import {Button, Form, Input, Select, Card, Col, Row} from 'antd';
import _ from 'lodash';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import 'antd/dist/antd.css';
import '../index.css';

import {QUESTIONS} from './Options';

const { Option } = Select;
const customerBaseURL = 'http://localhost:8080/api/admin/customer';

// TODO: add the bearer token to fix the 401
const EditInfo = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const curCustomerId = localStorage.getItem('customerId');

    const submitEditForm = (values) => {
        console.log(values);

        // Set the bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

        axios.put(customerBaseURL +'/' + curCustomerId, values)
            .then(function (response) {
                if (response.status === 200) {
                    navigate('/');
                }
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    alert('Need bearer token?');
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
            title='Edit Info'
        >
            <Form
                className='form-inside-card'
                form={form}
                layout='vertical'
                onFinish={submitEditForm}
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
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            label='First Name'
                            name='firstName'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your first name.'
                                }
                            ]}
                        >
                            <Input type = 'textarea' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='Last Name'
                            name='lastName'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your last name.'
                                }
                            ]}
                        >
                            <Input type = 'textarea' />
                        </Form.Item>
                    </Col>
                </Row>

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
                        Confirm Editing
                    </Button>
                </Form.Item>

            </Form>
        </Card>
    );
};

export default EditInfo;
