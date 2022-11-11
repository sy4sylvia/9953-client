import { Form, Input, Modal } from 'antd';
import React from 'react';

import axios from 'axios';
import forgotPasswordURL from '../services/api';
import {useNavigate} from "react-router-dom";

const ForgotPasswordForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

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
                // axios.post(forgotPasswordURL, values).then(function (response) {
                //     console.log(response);
                //     if (response.status === 200) {
                //         // TODO: get the lastName and firstName from the backend and display on the frontend
                //         // TODO: get the customer ID and retrieve token
                //         navigate('/change-password');
                //     } else {
                //         alert("Wrong account or password.");
                //     }
                // }).catch(function (error) {
                //     console.log(error);
                //     alert(error);
                // });
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
            </Form>
        </Modal>
    );
};

export default ForgotPasswordForm;