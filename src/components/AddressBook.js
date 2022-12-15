import React, {useEffect, useState} from 'react';
import {Button, Col, Row, Table, Typography} from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const { Title } = Typography;

const addressBaseURL = 'http://localhost:8080/api/admin/customer/address';

const AddressBook = () => {
    const navigate = useNavigate();

    const [addressData, setAddressData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });


    const addressColumns = [
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Region',
            dataIndex: 'region',
            key: 'region',
        },
        {
            title: 'Market',
            dataIndex: 'market',
            key: 'market',
        },
        {
            title: 'Is Primary Address ',
            dataIndex: 'isPrimary',
            key: 'isPrimary',
        },
        {
            title: 'Postal Code',
            dataIndex: 'postalCode',
            key: 'postalCode',
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            render:(text, record) => (
                <Button
                    onClick={()=> {
                        localStorage.setItem('shipAddressId', record.shipAddressId);
                        alert('Continuing to updating your current address...');
                        navigate('/edit-address');
                    }
                }>
                    {'Edit'}
                </Button>),

        },
        {
            title: 'Remove',
            dataIndex: 'remove',
            key: 'remove',

            render:(text, record) => (
                <Button
                    onClick={()=> {
                        if (addressData.length < 2) {
                            alert('Sorry, we require at least one address on your profile.');
                        } else {
                            localStorage.setItem('shipAddressId', record.shipAddressId);
                            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

                            axios.delete(addressBaseURL + '/' + record.shipAddressId)
                                .then(function (response) {
                                    console.log('response from the backend', response);
                                    if (response.status === 200) {
                                        alert('You have successfully deleted this address, please refresh the page to view.')
                                        navigate('/addresses')
                                    }
                                }).catch(error => {
                                if (error.response.status === 400) {
                                    alert(error.response);
                                } else if (error.response.status === 401) {
                                    alert('Invalid JWT, please log in again.');
                                    navigate('/login');
                                } else {
                                    alert(error);
                                }
                            });
                        }
                    }}>
                    {'Remove'}
                </Button>),
        }

    ];
    const fetchAddress = () => {
        setLoading(true);
        const curCustomerId = localStorage.getItem('customerId');

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

        axios.get(addressBaseURL, {params: {customerId: curCustomerId}})
            .then(function (response) {
                if (response.status === 200) {
                    setAddressData(response.data);
                    setLoading(false);
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: response.data.length, // total count before the filter
                        },
                    });
                }
            }).catch(function (error) {
                if (error.response.status === 401) {
                    alert('Invalid JWT, please log in again.');
                    navigate('/login');
                } else {
                    alert(error);
                }
        });
    }

    useEffect(() => {
        fetchAddress();
    }, [JSON.stringify(tableParams)]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };

    return (
        <div>
            <div style={{padding: '80px 120px'}}>
                <Title level={3}>Address Book</Title>
                <Row>
                    <Col span={20}>
                        <Table
                            columns={addressColumns}
                            dataSource={addressData}
                            pagination={tableParams.pagination}
                            loading={loading}
                            onChange={handleTableChange}
                            onRow={(record) => {
                                return {
                                    // click row
                                    onClick: () => {
                                        console.log(record.id);
                                    },
                                };
                            }}
                        />

                    </Col>
                    <Col span={4}>
                        <Button
                            onClick={() => navigate('/add-address')}
                            style={{
                                left: '50px',
                                height: '200px',
                                width: '200px',
                            }}
                        >
                            <Title><PlusOutlined /></Title>
                            <Title
                                level={5}
                            >Add Address</Title>
                        </Button>
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

