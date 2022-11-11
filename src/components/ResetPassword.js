import React, {useState } from 'react';
import ResetPasswordForm from './ResetPasswordForm';

// TODO:change to input link only and send email
const ResetPassword = () => {
    const [openResetPassword, setOpenResetPassword] = useState(true); //moved up
    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setOpenResetPassword(false);
    };
    return (
        <div>
            <ResetPasswordForm
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

export default ResetPassword;