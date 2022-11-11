import React, {useState } from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';

import axios from 'axios';
import forgotPasswordURL from '../services/api';

import {useNavigate} from 'react-router-dom';

// TODO:change to input link only and send email
const ForgotPassword = () => {
    const [openResetPassword, setOpenResetPassword] = useState(true); //moved up
    const navigate = useNavigate();

    const onCreate = (values) => {
        axios.post(forgotPasswordURL, values).then(function (response) {
            console.log(response);
            if (response.status === 200) {
                // TODO: get the lastName and firstName from the backend and display on the frontend
                // TODO: get the customer ID and retrieve token
                navigate('/change-password');
            } else {
                alert("Wrong account or password.");
            }
        }).catch(function (error) {
            console.log(error);
            alert(error);
        });

        setOpenResetPassword(false);
    };
    return (
        <div>
            <ForgotPasswordForm
                open={openResetPassword}
                onCreate={onCreate}
                onCancel={(e) => {
                    e.stopPropagation();
                    setOpenResetPassword(false);
                }}
            />
        </div>
    );
};

export default ForgotPassword;