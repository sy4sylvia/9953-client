import React, {useEffect, useState} from 'react';
import {Table, Button, Typography } from 'antd';

import { COLUMNS } from './OrderTable'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

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

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;
    const fetchOrders = () => {
        setLoading(true);
        axios.get(orderBaseURL, {params: {customerId: curCustomerId}})
            .then(function (response) {
                if (response.status === 200) {
                    let values = response.data.orderSet;

                    console.log(values);

                    for (let i = 0; i < values.length; i++) {
                        // extract the shipping address
                        const separator = ', ';
                        const curCode = values[i].postalCode;
                        const curCity = values[i].city;
                        const curState = values[i].state;
                        const curCountry = values[i].country;
                        const curRegion = values[i].region;
                        const curMarket = values[i].market;

                        const address = curCode + separator+ curCity + separator + curState + separator
                            + curCountry + separator + curRegion + separator + curMarket;
                        values[i] = Object.assign({'address': address}, values[i]);

                        // extract the product information
                        let products = '';
                        for (let j = 0; j < values[i].productResponseSet.length; j++) {
                            products += values[i].productResponseSet[j].productName + ' & ';
                        }

                        // delete the last & symbol
                        const final_products = products.substring(0,products.length - 3);
                        values[i] = Object.assign({'products': final_products}, values[i]);
                    }

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

