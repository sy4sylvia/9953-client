import React from 'react';
import {useNavigate} from 'react-router-dom';
import {AutoComplete, Button, Card, Col, Form, Input, Row, Select} from 'antd';
import {City, Country, State} from 'country-state-city';
import _ from 'lodash';

import {MARKET, REGION} from './Options';
import axios from "axios";

const AddAddress = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const { Option } = Select;

    const navigate = useNavigate();

    const marketChildren = [];
    const regionChildren = [];

    const countryChildren = [];
    const stateChildren = [];
    const cityChildren = [];

    _.forEach(MARKET, (market) => {
        marketChildren.push(<Option value={market.label}> {market.key} </Option>);
    });

    _.forEach(REGION, (market) => {
        regionChildren.push(<Option value={market.label}> {market.key} </Option>);
    });

    _.forEach(Country.getAllCountries(), (country) => {
        countryChildren.push(<Option value={country.name}> {country.name} </Option>);
    })

    _.forEach(State.getAllStates(), (state) => {
        stateChildren.push(<Option value={state.name}> {state.name} </Option>);
    })

    _.forEach(City.getAllCities(), (city) => {
        cityChildren.push(<Option value={city.name}> {city.name} </Option>);
    })

    const submitNewAddressForm = (values) => {
        console.log(values);
        values = Object.assign({'isPrimary': 'N'}, values);

        axios.post('http://localhost:8080/customer/address', values).then(function (response) {
            console.log('response from the backend', response);
            if (response.status === 200) {
                navigate('/address-book');
            } else {
                alert('Missing info');
            }
        }).catch(function (error) {
            console.log(error);
            alert(error);
        });
    }

    const handleSelectChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    return (
        <Card
            className='card-form-wrapper'
            title='Add Address'
        >
            <Form
                className='form-inside-card'
                form={form}
                layout='vertical'
                onFinish={submitNewAddressForm}
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

                <Row gutter={8}>
                    <Col span={12}>
                        <Form.Item
                            label='First Name'
                            name='firstName'
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
                            name='lastName'
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

                <Row gutter={8}>
                    <Col span={12}>
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
                                defaultValue='Market'
                                onChange={handleSelectChange}
                            >
                                {marketChildren}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
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
                    </Col>
                </Row>

                <Row gutter={8}>
                    <Col span={12}>
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
                            <AutoComplete
                                size={'middle'}
                                defaultValue=''
                                onChange={handleSelectChange}
                            >
                                {countryChildren}
                            </AutoComplete>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
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
                            <AutoComplete
                                size={'middle'}
                                defaultValue=''
                                onChange={handleSelectChange}
                            >
                                {stateChildren}
                            </AutoComplete>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={8}>
                    <Col span={12}>
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
                            <AutoComplete
                                size={'middle'}
                                defaultValue=''
                                onChange={handleSelectChange}
                            >
                                {cityChildren}
                            </AutoComplete>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='Postal Code'
                            name='postalCode'
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input the postal code.'
                                }
                            ]}
                        >
                            <Input type = 'textarea'/>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Add New Address
                    </Button>
                </Form.Item>

            </Form>
        </Card>
    );
};

export default AddAddress;