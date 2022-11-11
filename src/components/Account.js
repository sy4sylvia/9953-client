import React, { useState, useEffect } from 'react';
import {Button, Card, Divider, Typography} from 'antd';

import UserService from '../services/user.service';
import EventBus from '../common/EventBus';

const { Title } = Typography;

const Account = () => {

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

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []);

    return (
        <div>
            <div style={{padding: '80px 120px'}}>
                <Title level={3}>My Account</Title>
                <Title
                    level={4}
                    style={{padding: '20px'}}
                >
                    Welcome back!
                </Title>
                {/*TODO: change the hard-coded data to content*/}
                {/*{content}*/}
                <Card>
                    Account Info
                    <Divider />
                    Name: Justin Ritter
                    <Divider />
                    Email: jritter@gmail.com
                </Card>
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
                    Edit Info
                </Button>
                <Button
                    style={{left: '20px'}}
                >
                    Change Password
                </Button>
            </div>
        </div>
    );
}

export default Account;

