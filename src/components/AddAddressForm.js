import { Form, Input, Modal, Select} from 'antd';
import React from 'react';
import {useNavigate} from 'react-router-dom';


const AddAddressForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    const { Option } = Select;

    // direct to other pages
    const navigate = useNavigate();

    const gotoPage = (path) => {
        // go to menu item page
        navigate(path);
    };


    const marketChildren = [];
    const regionChildren = [];
    const countryChildren = [];
    const stateChildren = [];
    // TODO: these items should be retrieved from the database
    marketChildren.push(<Option value="dummy">dummy</Option>); //dummy example
    regionChildren.push(<Option value="lucy">lucy</Option>); //dummy example
    countryChildren.push(<Option value='Australia'>Australia</Option>);
    stateChildren.push(<Option value='California'>What is your mother's maiden name?</Option>);

    const handleSelectChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    return (
        <Modal
            open={open}
            title='Add Address'
            okText='Finish Signing Up'
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
                    label='Market'
                    name='market'
                    rules={[
                        {
                            required: true,
                            message: 'Please choose your market.'
                        }
                    ]}
                >
                    <Select
                        size={'middle'}
                        defaultValue='State'
                        onChange={handleSelectChange}
                    >
                        {marketChildren}
                    </Select>
                </Form.Item>

                <Form.Item
                    label='Region'
                    name='region'
                    rules={[
                        {
                            required: true,
                            message: 'Please choose your region.'
                        }
                    ]}
                >
                    <Select
                        size={'middle'}
                        defaultValue='Region'
                        onChange={handleSelectChange}
                    >
                        {regionChildren}
                    </Select>
                </Form.Item>

                <Form.Item
                    label='Country'
                    name='country'
                    rules={[
                        {
                            required: true,
                            message: 'Please choose your country.'
                        }
                    ]}
                >
                    <Select
                        size={'middle'}
                        defaultValue='Country'
                        onChange={handleSelectChange}
                    >
                        {countryChildren}
                    </Select>
                </Form.Item>


                <Form.Item
                    label='State'
                    name='state'
                    rules={[
                        {
                            required: true,
                            message: 'Please choose your state.'
                        }
                    ]}
                >
                    <Select
                        size={'middle'}
                        defaultValue='State'
                        onChange={handleSelectChange}
                    >
                        {stateChildren}
                    </Select>
                </Form.Item>

                <Form.Item
                    label='City'
                    name='city'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your city.'
                        }
                    ]}
                >
                    <Input type = 'textarea'/>
                </Form.Item>

                <Form.Item
                    label='Postal Code'
                    name='zipcode'
                    rules={[
                        {
                            required: false,
                            message: 'Please input the postal code.'
                        }
                    ]}
                >
                    <Input type = 'textarea'/>
                </Form.Item>
                
                <a className={'forget-password-link'}
                   onClick={() => gotoPage('/')}>
                    Sign in here
                </a>
            </Form>
        </Modal>
    );
};

export default AddAddressForm;