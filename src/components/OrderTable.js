import { Button } from 'antd';
import axios from 'axios';

import 'antd/dist/antd.css';

const orderBaseURL = 'http://localhost:8080/api/order';
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
    // {
    //     title: 'Return Status',
    //     dataIndex: 'isReturned',
    //     key: 'isReturned',
    //     render: (text) => <text>{"No"}</text>,
    // },
    {
        title: 'Return',
        dataIndex: 'return',
        key: 'return',

        render:(text, record) => (
            // text undefined
            <Button onClick={()=> {
                const today = new Date().getDate();
                if (today - record.arrivingDate > 30) {
                    alert('You can only return an order within 30 days');
                } else {
                    const curCustomerId = localStorage.getItem('customerId');

                    let values = {}
                    values = Object.assign({'isReturned': 'Y'}, values)
                    values = Object.assign({'orderId': record.id}, values)

                    axios.post(orderBaseURL, values, {params: {customerId: curCustomerId}})
                        .then(function (response) {
                            if (response.status === 200) {
                                alert('You just successfully returned your order: ' + record.id);
                            } else {
                                alert('Missing info');
                            }
                    }).catch(function (error) {
                        console.log(error);
                        alert(error);
                    });
                }
                console.log('record ', record)
            }}>
                {"Return"}
            </Button>),

    },
];

export { COLUMNS };