import React from 'react';
import { Button, Col, Form, Input, Card, Row } from 'antd';

import 'antd/dist/antd.css';
import '../index.css';

const Test = () => {
    const [form] = Form.useForm();

    const submitPaymentForm = (values) => {
        values = Object.assign({'isPrimary': 'Y'}, values);
        values = Object.assign({'segment': 'Consumer'}, values);
        console.log(values);
    };


    return (
        <Card
            className='card-form-wrapper'
            title='Payment Information'
        >
            <Form
                className='form-inside-card'
                form={form}
                layout='vertical'
                onFinish={submitPaymentForm}
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            label='MM/YY'
                            name='creditCardExpiredDate'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the expired date.'
                                }
                            ]}
                        >
                            <Input type = 'textarea' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='CVV'
                            name='creditCardCvv'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the cvv.'
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label='Card Holder'
                    name='creditCardHolder'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the card holder name.'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Card Number'
                    name='creditCardNumber'
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
                        Confirm
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Test;