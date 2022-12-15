import React, { useEffect, useState } from 'react';
import {Button, Form, Input, Select, Card, Col, Row, AutoComplete} from 'antd';
import _ from 'lodash';
import axios from 'axios';
import { Country, State } from 'country-state-city';
import {useNavigate} from 'react-router-dom';

import 'antd/dist/antd.css';
import '../index.css';

import {MARKET, REGION} from './Options';

const { Option } = Select;
const addressBaseURL = 'http://localhost:8080/api/admin/customer/address/';

const EditAddress = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const marketChildren = [];
    const regionChildren = [];
    const countryChildren = [];
    const stateChildren = [];

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


    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;
    const curAddressId = localStorage.getItem('shipAddressId');

    const[city, setCity] = useState();
    const[state, setState] = useState();
    const[country, setCountry] = useState();
    const[region, setRegion] = useState();
    const[market, setMarket] = useState();
    const[zipcode, setZipcode] = useState();
    const[primary, setPrimary] = useState();

    const fetchAddressById = () => {
        console.log('called fetchAddressById ');
        axios.get(addressBaseURL + curAddressId)
            .then((response) => {
                if (response.status === 200) {
                    setCity(response.data.city);
                    setState(response.data.state);
                    setCountry(response.data.country);
                    setRegion(response.data.region);
                    setMarket(response.data.market);
                    setZipcode(response.data.postalCode);
                    setPrimary(response.data.isPrimary);
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    alert('Need bearer token?');
                } else {
                    alert(error);
                }
            })
    };

    useEffect(() => {
        fetchAddressById();
    }, []);

    const submitEditForm = (values) => {
        console.log(values);

        axios.put(addressBaseURL + curAddressId, values)
            .then(function (response) {
                console.log("updated info response: ", response)
                if (response.status === 200) {
                    alert('You have successfully updated your current address!')
                    navigate('/addresses');
                }
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    alert('Invalid JWT, please log in again.');
                    navigate('/login');
                } else {
                    alert(error);
                }
            });
    }

    const handleSelectChange = (value) => {
        console.log(`Selected: ${value}`);
    };

    return (
        <Card
            className='card-form-wrapper'
            title='Update Address'
        >
            <Form
                className='form-inside-card'
                form={form}
                layout='vertical'
                onFinish={submitEditForm}
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
                                placeholder={market}
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
                                placeholder={region}
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
                                placeholder={country}
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
                                placeholder={state}
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
                            <Input type = 'textarea' placeholder={city} />
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
                            <Input type = 'textarea' placeholder={zipcode} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={8}>
                    <Form.Item
                        label='Set to the Primary Address'
                        name='isPrimary'
                        rules={[
                            {
                                required: true,
                                message: 'Please choose the options.'
                            }
                        ]}
                    >
                        <Select
                            placeholder={primary}
                            // onChange={handleChange}
                            options={[
                                {
                                    value: 'N',
                                    label: 'No',
                                },
                                {
                                    value: 'Y',
                                    label: 'Yes',
                                },
                            ]}
                        />


                    </Form.Item>

                </Row>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Confirm Editing
                    </Button>
                </Form.Item>

            </Form>
        </Card>
    );
};

export default EditAddress;
