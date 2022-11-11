import { Button, Card, Form, Input } from 'antd';
import React from 'react';


const ChangePassword = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card style={{
            textAlign: 'center',
            width: 600 }}>
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
            onFinish={onFinish}
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
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Reset Password
                </Button>
            </Form.Item>
        </Form>
        </Card>
    );
};

export default ChangePassword;