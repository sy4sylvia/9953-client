import React, { useState } from 'react';
import { Button, Card, Col, Divider, Row, Typography } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const { Title } = Typography;

const addressBaseURL = 'http://localhost:8080/api/admin/customer/address';
const curCustomerId = localStorage.getItem('customerId');

// TODO: add more cards if there are more addresses
// todo: has a 400 error message when first rendering... -> maybe refer to search products
const AddressBook = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    const shipAddressIds = [];
    const postalCodes = [];
    const cities = [];
    const states = [];
    const countries = [];
    const regions = [];
    const markets = [];
    const primaryOptions = [];

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

    if (data === null) {
        axios.get(addressBaseURL, {params: {customerId: curCustomerId}})
            .then(function (response) {
                console.log('response from the backend', response);
                if (response.status === 200) {
                    console.log(response.data);
                    setData(response.data);
                } else {
                    alert('Invalid Info');
                    navigate('/login');
                }
            }).catch(function (error) {
            console.log(error);
            alert(error);
        });
    }

    if (data !== null) {
        for (let i = 0; i < data.length; i++) {
            shipAddressIds.push(data[i].shipAddressId);
            postalCodes.push(data[i].postalCode);
            cities.push(data[i].city);
            states.push(data[i].state);
            countries.push(data[i].country);
            regions.push(data[i].region);
            markets.push(data[i].market);
            primaryOptions.push(data[i].isPrimary);
        }
    }

    let primaryIdx = 0;
    let otherIdx = 1;
    for (let i = 0; i < primaryOptions.length; i++) {
        if (primaryOptions[i] === 'Y') {
            primaryIdx = i;
            break;
        }
    }
    if (primaryIdx === 1) {
        otherIdx = 0;
    }


    return (
        <div>
            <div style={{padding: '80px 120px'}}>
                <Title level={3}>Address Book</Title>
                <Row>
                    <Col span={8}>
                        <Button
                            onClick={() => navigate('/add-address')}
                            style={{
                                height: '300px',
                                width: '300px',
                            }}
                        >
                            <Title><PlusOutlined /></Title>
                            <Title
                                level={5}
                            >Add Address</Title>
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{
                                height: '350px',
                                width: '300px',
                            }}
                        >
                            <Title level={4}>Primary Address</Title>
                            <Divider />
                            Postal Code: {postalCodes[primaryIdx]}<br/>
                            City: {cities[primaryIdx]} <br/>
                            State: {states[primaryIdx]} <br/>
                            Country: {countries[primaryIdx]} <br/>
                            Market: {markets[primaryIdx]} <br/>
                            Region: {regions[primaryIdx]} <br/>
                            Is Primary Address: Yes
                            <Divider />
                            {/*TODO: add onClick functions for the edit / remove*/}
                            <Button
                                onClick={() =>{
                                    navigate('/edit-address');
                                    localStorage.setItem('shipAddressId', shipAddressIds[primaryIdx]);
                                    localStorage.setItem('isPrimary', 'Y');
                                }}
                            >
                                Edit
                            </Button>
                            <Divider type='vertical' />
                            <Button
                                onClick={() => {
                                    localStorage.setItem('shipAddressId', shipAddressIds[primaryIdx]);
                                    axios.delete(addressBaseURL + '/' + shipAddressIds[primaryIdx])
                                        .then(function (response) {
                                        console.log('response from the backend', response);
                                        if (response.status === 200) {
                                            alert('You have successfully deleted this address!')
                                            navigate('/addresses')
                                        } else {
                                            alert('Invalid Info');
                                            navigate('/login');
                                        }
                                    }).catch((error) => alert(error))}
                                }
                            >
                                Remove
                            </Button>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{
                                height: '350px',
                                width: '300px',
                            }}
                        >
                            <Title level={4}>Additional Address</Title>
                            <Divider />
                            Postal Code: {postalCodes[otherIdx]}<br/>
                            City: {cities[otherIdx]} <br/>
                            State: {states[otherIdx]} <br/>
                            Country: {countries[otherIdx]} <br/>
                            Market: {markets[otherIdx]} <br/>
                            Region: {regions[otherIdx]} <br/>
                            Is Primary Address: No
                            <Divider />
                            <Button
                                onClick={() =>{
                                    navigate('/edit-address');
                                    localStorage.setItem('shipAddressId', shipAddressIds[otherIdx]);
                                    localStorage.setItem('isPrimary', 'N');
                                }}
                            >
                                Edit
                            </Button>
                            <Divider type='vertical' />
                            <Button
                                onClick={() => {
                                    localStorage.setItem('shipAddressId', shipAddressIds[otherIdx]);
                                    axios.delete(addressBaseURL + '/' + shipAddressIds[otherIdx])
                                        .then(function (response) {
                                            console.log('response from the backend', response);
                                            if (response.status === 200) {
                                                navigate('/addresses')
                                            } else {
                                                alert('Invalid Info');
                                                navigate('/login');
                                            }
                                        }).catch((error) => alert(error))}
                                }
                            >
                                Remove
                            </Button>
                        </Card>
                    </Col>
                </Row>

            </div>
            <div
                style={{
                    paddingBottom: '20px',
                    paddingTop: '0',
                }}
            >
            </div>
        </div>
    );
}

export default AddressBook;

