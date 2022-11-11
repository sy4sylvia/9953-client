import React, {useState } from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';

// TODO:change to input link only and send email
const ForgotPassword = () => {
    const [openResetPassword, setOpenResetPassword] = useState(true); //moved up
    const onCreate = (values) => {
        console.log('Received values of form: ', values);
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