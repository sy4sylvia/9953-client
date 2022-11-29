import React, {useState} from 'react';
import {Table, Button, Typography } from 'antd';

import { COLUMNS, DATA } from './OrderTable'
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const { Title } = Typography;
const orderBaseURL = 'http://localhost:8080/api/order';

const curCustomerId = localStorage.getItem('customerId');
const OrderHistory = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authorization')}`;

    if (data === null) {
        axios.get(orderBaseURL, {params: {customerId: curCustomerId}})
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
    // const [content, setContent] = useState('');
    // useEffect(() => {
    //     UserService.getUserAccount().then(
    //         (response) => {
    //             setContent(response.data);
    //         },
    //         (error) => {
    //             const _content =
    //                 (error.response &&
    //                     error.response.data &&
    //                     error.response.data.message) ||
    //                 error.message ||
    //                 error.toString();
    //
    //             setContent(_content);
    //
    //             if (error.response && error.response.status === 401) {
    //                 EventBus.dispatch("logout");
    //             }
    //         }
    //     );
    // }, []);

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

