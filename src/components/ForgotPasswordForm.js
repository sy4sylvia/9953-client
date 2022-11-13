import { Form, Input, Modal } from 'antd';
import React from 'react';

const ForgotPasswordForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            open={open}
            title='Forgot Password'
            okText='Send Link to Email'
            cancelText='Cancel'
            onCancel={onCancel}
            onOk={() => {
                // TODO: send to backend and get a 200 OK
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={<Form
                    form={form}
                    layout='vertical'
                    name='form_in_modal'
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
                </Form>}
                layout='vertical'
                name='form_in_modal'
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
            </Form>
        </Modal>
    );
};

export default ForgotPasswordForm;