import React, { useState } from 'react';
import {Button, Card, Divider, Typography} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import UserService from '../services/user.service';
import EventBus from '../common/EventBus';

const { Title } = Typography;
const customerBaseURL = 'http://localhost:8080/api/admin/customer';

const Account = () => {
    const navigate = useNavigate();
    const curCustomerId = localStorage.getItem('customerId');
    const [curEmail, setCurEmail] = useState();
    const [curFirstName, setCurFirstName] = useState();
    const [curLastName, setCurLastName] = useState();

    // TODO: need to carry the bearer token to GET, otherwise 401 erroe
    axios.get(customerBaseURL +'/' + curCustomerId).then(function (response) {
        console.log('response from the backend', response);
        if (response.status === 200) {
            setCurEmail(response.data.email);
            setCurFirstName(response.data.firstName);
            setCurLastName(response.data.lastName);
        } else {
            alert('Invalid Info');
            navigate('/login');
        }
    }).catch(function (error) {
        console.log(error);
        alert(error);
    });

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
                    Name: {curFirstName} {curLastName}
                    <Divider />
                    Email: {curEmail}
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
                    onClick={() => {navigate('/edit-info')} }
                >
                    Edit Info
                </Button>
                <Button
                    style={{left: '20px'}}
                    onClick={() => {navigate('/update-password')} }
                >
                    Update Password
                </Button>
            </div>
        </div>
    );
}

export default Account;

