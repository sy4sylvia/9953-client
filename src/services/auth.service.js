// auth.service is used for authentication service
// The service uses Axios for HTTP requests and Local Storage for user information & JWT.

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const register = (
    firstName, lastName, segment,
    email, password, securityQuestion, securityAnswer,
    market, region, country, state, city, postalCode, isPrimary ) => {
    return axios.post('http://localhost:8080/api/admin/customer', {
        email,
        password,
        securityQuestion,
        securityAnswer,
        market,
        region,
        country,
        state,
        city,
        postalCode,
        isPrimary
    });
};

// login posts the info that the user needs to log in and saves the profile to local storage
const login = ( email, password, securityQuestion, securityAnswer) => {
    return axios.post(API_URL + '/customer/login',  {
        email,
        password,
        securityQuestion,
        securityAnswer,
    }).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser
}

export default AuthService;