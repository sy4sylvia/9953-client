import React from 'react';
import {Button, Card, Col, Divider, Row, Typography} from 'antd';
import { PlusOutlined} from '@ant-design/icons';

const { Title } = Typography;

const AddressBook = () => {
    return (
        <div>
            <div style={{padding: '80px 120px'}}>
                <Title level={3}>Address Book</Title>

                <Row>
                    <Col span={8}>
                        <Card>
                           <Title><PlusOutlined /></Title>
                            <Title level={5}>Add Address</Title>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Title level={3}>Primary Address</Title>
                            <Divider />
                            jritter@gmail.com <br/>
                            Justin Ritter <br/>
                            Wollongong, New South Wales <br/>
                            Australia <br/>
                            Oceania <br/>
                            Asia Pacific <br/>
                            <Divider />
                            {/*TODO: add onClick functions for the edit / remove*/}
                            Edit
                            <Divider type='vertical' />
                            Remove
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Title level={3}>Additional Address</Title>
                            <Divider />
                            britter@gmail.com <br/>
                            Bob Ritter <br/>
                            Queensland, New South Wales <br/>
                            Australia <br/>
                            Oceania <br/>
                            Asia Pacific <br/>
                            <Divider />
                            Edit <Divider type='vertical' />
                            Remove <Divider type='vertical' />
                            Set as Primary
                        </Card>
                    </Col>
                </Row>

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
                >
                    Sign Out
                </Button>
            </div>
        </div>
    );
}

export default AddressBook;

