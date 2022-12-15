import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const OrderPlaced = () => {
    const navigate = useNavigate();

    const curOrderId = localStorage.getItem('orderId');
    const arrivingDate = localStorage.getItem('arrivingDate');

    const text = 'Order number: ' + curOrderId + ', arriving on ' + arrivingDate;

    return (
        <Result
            status='success'
            title='Successfully Placed an Order!'
            subTitle={text}
            extra={[
                <Button
                    type='primary'
                    key='console'
                    onClick={() => navigate('/order-history')}
                >
                    Go to Order History
                </Button>,
            ]}
        />
    );
};
export default OrderPlaced;