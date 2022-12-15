import React, { useEffect, useState} from 'react';
import {Button, Col, Divider, Row, Select, Table, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import { QUANTITY } from './Options';

import 'antd/dist/antd.css';

const { Title } = Typography;
const cartURL = 'http://localhost:8080/api/cart';

const Cart = () => {

    const style = {
        background: '#2db7f5',
        fontStyle: 'italic',
        height: '80px',
        padding: '8px',
        textAlign: 'center',
    };

    const navigate = useNavigate();

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

    const [buttonState, setButtonState] = useState(null);
    const [curQuantity, setCurQuantity] = useState(null);
    const [totalPrice, setTotalPrice] = useState();

    const [cartData, setCartData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const cartColumns = [
        {
            title: '',
            key: 'empty',
            dataIndex: 'empty',
            render: () => {
                return (
                    <h4 style={style}>Product Image</h4>
                );
            }
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            sorter: (a, b) => a.productName.localeCompare(b.productName),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => (
                <div>
                    <Select
                        placeholder={record.quantity}
                        style={{ width: 120,}}
                        onChange={(value) => {
                            console.log('select change, product id', record.productId);
                            setButtonState(record.productId);
                            setCurQuantity(value);
                        }}
                        options={QUANTITY}
                    />
                    {buttonState === record.productId &&
                        <Button
                            onClick={() => {
                                //axios.put, update the product by id and quantity
                                const curCustomerId = localStorage.getItem('customerId');
                                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

                                let values = [];
                                values = Object.assign({'productId': record.productId}, values);
                                values = Object.assign({'quantity': curQuantity}, values);

                                axios.put(cartURL + '/' + curCustomerId, values)
                                    .then(function (response) {
                                        console.log('response from the backend', response);
                                        if (response.status === 200) {
                                            alert('You have successfully updated the quantity of this product from your cart.');
                                            setButtonState(null);
                                            navigate('/cart')
                                        }
                                    }).catch(error => {
                                    if (error.response.status === 400) {
                                        alert(error);
                                    } else if (error.response.status === 401) {
                                        alert('Invalid JWT, please log in again.');
                                        navigate('/login');
                                    } else {
                                        alert(error);
                                    }
                                });
                            }
                        }>
                            Confirm
                        </Button>
                    }
                </div>
            ),
        },
        {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            sorter: (a, b) => a.unitPrice - b.unitPrice,
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            sorter: (a, b) => a.discount - b.discount,
        },
        {
            title: 'Remove from Cart',
            dataIndex: 'remove',
            key: 'remove',

            render:(text, record) => (
                <Button
                    onClick={()=> {
                        // axios.delete
                        const curCustomerId = localStorage.getItem('customerId');
                        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

                        let values = [];
                        values = Object.assign({'productId': record.productId}, values);

                        axios.delete(cartURL + '/' + curCustomerId, {data: values})
                            .then(function (response) {
                                console.log('response from the backend', response);
                                if (response.status === 200) {
                                    alert('You have successfully deleted this product from your cart, please refresh the page.');
                                    setButtonState(null);
                                    navigate('/cart')
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
                    }}>
                    {'Delete'}
                </Button>),
        }
    ];
    const fetchCart = () => {
        setLoading(true);
        const curCustomerId = localStorage.getItem('customerId');

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

        axios.get(cartURL +'/' + curCustomerId)
            .then(function (response) {
                if (response.status === 200) {
                    console.log('response.data ', response.data);
                    setCartData(response.data);

                    let total = 0;
                    for (let i = 0; i < response.data.length; i++) {
                        total += response.data[i].unitPrice * response.data[i].quantity * (1 - response.data[i].discount);
                    }
                    setTotalPrice(total);

                    setLoading(false);
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: response.data.length,
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
        fetchCart();
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
        <div style={{padding: '120px 120px'}} >
            <Row
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}
            >
                <Col className="gutter-row" span={18}>
                    <Row>
                        <Table
                            columns={cartColumns}
                            dataSource={cartData}
                            pagination={tableParams.pagination}
                            loading={loading}
                            onChange={handleTableChange}
                            onRow={(record) => {
                                return {
                                    onClick: () => {
                                        console.log('record? ', record.productId);
                                    },
                                };
                            }}
                        />
                    </Row>
                </Col>

                <Col className="gutter-row" span={4}>
                    <div>
                        <Title level = {4}>
                            {/*Subtotal: {quantities[0] * prices[0] + quantities[1] * prices[1]}*/}
                            Subtotal: {totalPrice}

                            <Divider dashed />
                            Shipping: TBD
                        </Title>
                    </div>

                    <Divider />

                    <div>
                        <Title level = {4}>
                            Estimated Total: TBD
                        </Title>
                    </div>
                    <Divider />
                    <Button
                        block
                        type='primary'
                        onClick={() => {
                            alert('Continuing with the checkout process...');
                            navigate('/checkout');
                        }
                        }
                    >
                        Checkout
                    </Button>
                    <Divider />
                </Col>
            </Row>
        </div>
        </div>
    )
};

export default Cart;