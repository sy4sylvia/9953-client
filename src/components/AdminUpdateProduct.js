import React from 'react';
import { Button, Form, Input, Card } from 'antd';
import {useNavigate} from 'react-router-dom';

import 'antd/dist/antd.css';
import '../index.css';

const AdminUpdateProduct = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    if (localStorage.getItem('admin') === null) {
        alert('Please log in before making modifications.')
        navigate('/admin-login');
    }

    const submitUpdateProductForm = (values) => {
        console.log(values);
        alert('You have successfully updated the stock of the product with id: ' + values.productId +
            ' to ' + values.stock);
    }

    return (
        <Card
            className='card-form-wrapper'
            title='Admin Update Product'
        >
            <Form
                className='form-inside-card'
                form={form}
                layout='vertical'
                onFinish={submitUpdateProductForm}
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    label='Product ID'
                    name='productId'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the product id.'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Update the Stock'
                    name='stock'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the new stock for this product.'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Confirm Updating the Stock
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default AdminUpdateProduct;
