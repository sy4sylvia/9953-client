import React, {useEffect, useState} from 'react';
import {Table, Button, Typography } from 'antd';

import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import _ from 'lodash';

const { Title } = Typography;
const orderBaseURL = 'http://localhost:8080/api/order';

const curCustomerId = localStorage.getItem('customerId');
const OrderHistory = () => {
    const navigate = useNavigate();

    const [orderData, setOrderData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const COLUMNS = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Products',
            dataIndex: 'products',
            key: 'products',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Order Priority',
            dataIndex: 'orderPriority',
            key: 'orderPriority',
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
        {
            title: 'Shipping Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Ship Mode',
            dataIndex: 'shipMode',
            key: 'shipMode',
        },
        {
            title: 'Arrival Date',
            dataIndex: 'arrivingDate',
            key: 'arrivingDate',
        },
        {
            title: 'Return Status (N - No, Y - Yes)',
            dataIndex: 'isReturned',
            key: 'isReturned',
        },
        {
            title: 'Return',
            dataIndex: 'return',
            key: 'return',

            render:(text, record) => (
                // text undefined
                <Button
                    onClick={()=> {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

                        const today = new Date().getDate();

                        if (record.isReturned === 'Y') {
                            alert('This order has already been returned.');
                        } else if (today - record.arrivingDate > 30) {
                            alert('You can only return an order within 30 days.');
                        } else {
                            let values = {}
                            values = Object.assign({'isReturned': 'Y'}, values)
                            axios.put('http://localhost:8080/api/order/return/' + record.id, values)
                                .then(function (response) {
                                    if (response.status === 200) {
                                        alert('You just successfully returned your order: ' + record.id);
                                        navigate('/');
                                    }
                                }).catch(function (error) {
                                console.log(error);
                                alert(error);
                            });
                        }
                    }}>
                    {"Return"}
                </Button>),

        },
    ];


    console.log(localStorage.getItem('authorization'))
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;
    const fetchOrders = () => {
        setLoading(true);
        axios.get(orderBaseURL, {params: {customerId: curCustomerId}})
            .then(function (response) {
                if (response.status === 200) {
                    let values = response.data.orderResponseSet;
                    console.log(response.data.orderResponseSet);

                    let idx = 0;
                    const separator = ', ';

                    _.forEach(response.data.orderResponseSet, () => {
                        const curCode = values[idx].postalCode;
                        const curCity = values[idx].city;
                        const curState = values[idx].state;
                        const curCountry = values[idx].country;
                        const curRegion = values[idx].region;
                        const curMarket = values[idx].market;

                        const address = curCode + separator+ curCity + separator + curState + separator
                            + curCountry + separator + curRegion + separator + curMarket;
                        values[idx] = Object.assign({'address': address}, values[idx]);

                        // extract the product information
                        let products = '';
                        for (let j = 0; j < values[idx].productInOrderResponseSet.length; j++) {
                            products += values[idx].productInOrderResponseSet[j].productName + ' & ';
                        }

                        // delete the last & symbol
                        const final_products = products.substring(0,products.length - 3);
                        values[idx] = Object.assign({'products': final_products}, values[idx]);

                        // values[idx] = Object.assign({'return': 'Return'}, values[idx]);

                        idx++;
                    });

                    setOrderData(values);
                    setLoading(false);
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: response.data.length, // total count before the filter
                        },
                    });
                } else {
                    alert('Invalid Info');
                    navigate('/login');
                }
            }).catch(function (error) {
            console.log(error);
            alert(error);
        });
    }

    useEffect(() => {
        fetchOrders();
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
                <Title level={3}>Order History</Title>
                <Table
                    columns={COLUMNS}
                    dataSource={orderData}
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
            </div>
            <div
                style={{
                    paddingBottom: '20px',
                    paddingTop: '0',
                }}
            >
                <Button
                    style={{right: '20px'}}
                >
                    Back to My Account
                </Button>
                <Button
                    style={{left: '20px'}}
                    type = 'primary'
                >
                    Sign Out
                </Button>
            </div>
        </div>
    );
}

export default OrderHistory;

