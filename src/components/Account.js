import React from 'react';
import {Button, Card, Divider, Typography} from 'antd';

const { Title } = Typography;

const Account = () => {
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

