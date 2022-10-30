import React, {useEffect, useState} from 'react';
import {Col, Form, Input, Modal, Row, Select} from 'antd';
import AddAddressForm from "./AddAddressForm";

const SignUpForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const children = [];
    // TODO: these items should be retrieved from the database
    children.push(<Option value="Where are you now?">Where are you now?</Option>); //dummy example
    children.push(<Option value="lucy">lucy</Option>); //dummy example
    children.push(<Option value="What is your mother's maiden name?">What is your mother's maiden name?</Option>);

    const handleSelectChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    const submitForm = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                onCreate(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
            <Modal
                open={open}
                title='Sign Up'
                okText='Continue to add address'
                cancelText='Cancel'
                onCancel={onCancel}
                onOk={() => {
                    submitForm();
                }}
            >
                <Form
                    form={form}
                    layout='vertical'
                    name='form_in_modal'
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                label='First Name'
                                name='first-name'
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
                                name='last-name'
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

                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password.'
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
                        label='Security Question'
                        name='question'
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
                            {children}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label='Security Answer'
                        name='answer'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your answer for the security question.'
                            }
                        ]}
                    >
                        <Input type='textarea' />
                    </Form.Item>
                </Form>
            </Modal>
    );
};

export default SignUpForm;