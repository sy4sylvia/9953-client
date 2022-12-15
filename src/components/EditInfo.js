import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Select, Card, Col, Row} from 'antd';
import _ from 'lodash';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import 'antd/dist/antd.css';
import '../index.css';

import {QUESTIONS} from './Options';

const { Option } = Select;
const customerBaseURL = 'http://localhost:8080/api/admin/customer/';

const EditInfo = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Set the bearer token
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

    const curCustomerId = localStorage.getItem('customerId');

    const[email, setEmail] = useState();
    const[firstName, setFirstName] = useState();
    const[lastName, setLastName] = useState();

    const[securityQ, setSecurityQ] = useState();
    const[securityA, setSecurityA] = useState();

    const fetchCustomerInfo = () => {
        console.log('called fetchCustomerInfo ');
        axios.get(customerBaseURL + curCustomerId)
            .then((response) => {
                if (response.status === 200) {
                    setEmail(response.data.email);
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setSecurityQ(response.data.securityQuestion);
                    setSecurityA(response.data.securityAnswer);
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    alert('Need bearer token?');
                } else {
                    alert(error);
                }
            })
    }
    useEffect(() => {
        fetchCustomerInfo();
    }, []);

    const submitEditForm = (values) => {
        // set the original email address to be sent as part of the values of the form
        values.email = email;
        console.log(values);

        axios.put(customerBaseURL + curCustomerId, values)
            .then(function (response) {
                console.log("updated info response: ", response)
                if (response.status === 200) {
                    alert('You have successfully changed your information!');
                    navigate('/account');
                }
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    alert('Invalid JWT token, please log in again.');
                    navigate('/login');
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
                >
                    <Input disabled={true} placeholder={email} value={email} />
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
                            <Input type = 'textarea' placeholder={firstName} />
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
                            <Input type = 'textarea' placeholder={lastName}/>
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
                        placeholder={securityQ}
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
                    <Input type='textarea' placeholder={securityA} />
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
