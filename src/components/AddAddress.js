import React from 'react';
import {useNavigate} from 'react-router-dom';
import {AutoComplete, Button, Card, Col, Form, Input, Row, Select} from 'antd';
import {City, Country, State} from 'country-state-city';
import _ from 'lodash';
import axios from 'axios';

import {MARKET, REGION} from './Options';

const addAddressURL = 'http://localhost:8080/api/admin/customer/address';

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

    // Set the bearer token
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;
    const curCustomerId = localStorage.getItem('customerId');

    console.log(curCustomerId);

    const submitNewAddressForm = (values) => {
        console.log(values);
        // always change the added address to primary address
        values = Object.assign({'isPrimary': 'Y'}, values);
        values = Object.assign({'customerId': curCustomerId}, values);

        axios.post(addAddressURL, values).then(function (response) {
            console.log('response from the backend', response);
            if (response.status === 200) {
                navigate('/addresses');
            } else {
                alert('Missing info');
            }
        }).catch(function (error) {
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