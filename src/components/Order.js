import React from 'react';
import {Divider, Typography} from 'antd';
import { SmileOutlined} from '@ant-design/icons';

const { Title } = Typography;

const Order = () => {
    return (
        <div>
            <div style={{padding: '80px 120px'}}>
                <Title><SmileOutlined/></Title>
                <Title level={4}>Thank you!</Title>
                {/*TODO: add link to the specific order with number*/}
                <Title level={4}>Order Number: dummy-d-u-m-m-y</Title>
                <Divider />
                <Title level = {5}>Your order is confirmed and we're getting it ready by SHIP DATE </Title>
                <Divider />
            </div>
        </div>
    );
}

export default Order;

