import { Form, Input, Modal, Select} from 'antd';
import React, {useState} from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';


const SignInForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const { Option } = Select;

    const [openResetPasswordWindow, setOpenResetPasswordWindow] = useState(false);

    const showResetPasswordModal = () => {
        setOpenResetPasswordWindow(() => true);
        console.log('show reset password modal', openResetPasswordWindow);
    };

    const ResetPasswordModal = () => {
        const onCreateReset = (values) => {
            console.log('Received values of form: ', values);
            setOpenResetPasswordWindow(false);
        };
        return (
            <div>
                <ForgotPasswordForm
                    open={openResetPasswordWindow}
                    onCreate={onCreateReset}
                    onCancel={(e) => {
                        e.stopPropagation();
                        setOpenResetPasswordWindow(false);
                    }}
                />
            </div>
        );
    }


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
            title='Sign In'
            okText='Sign In'
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

                <a className={'forget-password-link'}
                   onClick={showResetPasswordModal}>
                    Forget Password
                    {openResetPasswordWindow? <ResetPasswordModal /> : null}
                </a>
            </Form>
        </Modal>
    );
};

export default SignInForm;