import { Form, Input, Modal, Select} from 'antd';
import React from 'react';

const ResetPasswordForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    // used for the select on security question
    const { Option } = Select;

    const children = [];
    // TODO: these items should be retrieved from the database
    children.push(<Option value="Where are you now?">Where are you now?</Option>); //dummy example
    children.push(<Option value="lucy">lucy</Option>); //dummy example
    children.push(<Option value="What is your mother's maiden name?">What is your mother's maiden name?</Option>);

    const handleSelectChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    return (
        <Modal
            open={open}
            title='Sign Up'
            okText='Continue to add address'
            cancelText='Cancel'
            onCancel={onCancel}
            onOk={() => {
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
                        defaultValue='Where are you now?'
                        onChange={handleSelectChange}
                    >
                        {children}
                    </Select>
                </Form.Item>

                {/*TODO: add validation here - only if the pair matches, this action could be taken*/}
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
            </Form>
        </Modal>
    );
};

export default ResetPasswordForm;