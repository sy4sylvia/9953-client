import React from 'react';
import {Table, Button, Typography } from 'antd';

import { COLUMNS, DATA } from './OrderTable'

const { Title } = Typography;

const OrderHistory = () => {
    return (
        <div>
            <div style={{padding: '80px 120px'}}>
                <Title level={3}>Order History</Title>

                <Table columns={COLUMNS} dataSource={DATA} />


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

