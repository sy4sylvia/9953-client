import React, {useEffect, useState} from 'react';
import {Table, Button, Typography } from 'antd';

import { COLUMNS, DATA } from './OrderTable'
import UserService from "../services/user.service";

const { Title } = Typography;

const OrderHistory = () => {
    const [content, setContent] = useState('');
    useEffect(() => {
        UserService.getUserAccount().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div>
            <div style={{padding: '80px 120px'}}>
                <Title level={3}>Order History</Title>
                {/*TODO: change the hard-coded data to content, table with real data*/}
                {/*{content}*/}
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

