import React, { useState } from 'react';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    // TODO

    return (
        <div>
            <h1>
                Register page
            </h1>
        </div>
    )
}

export default Register;