import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Form, Modal, Input, Select } from "antd";

const Test = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // states for the form
    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    // used for the select on security question
    const { Option } = Select;
    const children = [];
    // these items should be retrieved from the database
    children.push(<Option>{"What is your mother's maiden name?"}</Option>);

    const handleSelectChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Sign Up
            </Button>
            <Modal
                title="Sign Up"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8
                    }}
                    wrapperCol={{
                        span: 16
                    }}
                    initialValues={{
                        remember: true
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your First and Last Name."
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email."
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password."
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Re-type Password"
                        name="rePassword"
                        rules={[
                            {
                                required: true,
                                message: "Please retype your password."
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Security Question"
                        name="question"
                        rules={[
                            {
                                required: true,
                                message: "Please choose your security question."
                            }
                        ]}
                    >
                        <Select
                            size={"middle"}
                            defaultValue="Security Question"
                            onChange={handleSelectChange}
                            // style={{
                            //   width: 300
                            // }}
                        >
                            {children}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Security Answer"
                        name="answer"
                        rules={[
                            {
                                required: true,
                                message: "Please input your First and Last Name."
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 16
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Test;
