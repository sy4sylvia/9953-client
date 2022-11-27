import React from 'react';
import {Button, Card, Col, Divider, Row, Typography} from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

const { Title } = Typography;


const AddressBook = () => {

    const navigate = useNavigate();

    //
    // axios.get(addressBaseURL +'?customerId=' + curCustomerId)
    //     .then(function (response) {
    //         console.log('response from the backend', response);
    //         if (response.status === 200) {
    //             // setCurEmail(response.data.email);
    //             // setCurFirstName(response.data.firstName);
    //             // setCurLastName(response.data.lastName);
    //         } else {
    //             alert('Invalid Info');
    //             navigate('/login');
    //         }
    //     }).catch(function (error) {
    //     console.log(error);
    //     alert(error);
    // });

    return (
        <div>
            <div style={{padding: '80px 120px'}}>
                <Title level={3}>Address Book</Title>

                <Row>
                    <Col span={8}>
                        <Button
                            onClick={() => navigate('/add-address')}
                            style={{
                                height: '300px',
                                width: '300px',
                        }}
                        >
                            <Title><PlusOutlined /></Title>
                            <Title
                                level={5}
                            >Add Address</Title>
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Title level={4}>Primary Address</Title>
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
                            <Title level={4}>Additional Address</Title>
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
                    onClick={() => {localStorage.clear()}}
                >
                    Sign Out
                </Button>
            </div>
        </div>
    );
}

export default AddressBook;

