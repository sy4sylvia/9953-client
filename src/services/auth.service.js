// auth.service is used for authentication service
// The service uses Axios for HTTP requests and Local Storage for user information & JWT.

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/auth/';

const register = (email, password, question, answer) => {
    return axios.post(API_URL + 'register', {
        email,
        password,
        question,
        answer,
    });
};

// login posts the info that the user needs to log in and saves the profile to local storage
const login = (firstName, lastName, segment, email, password, question, answer) => {
    return axios.post(API_URL + 'login',  {
        firstName,
        lastName,
        segment,
        email,
        password,
        question,
        answer,
    }).then((response) => {
        if (response.data.email) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
    return axios.post(API_URL + 'logout')
        .then((response) => {
            return response.data;
        });
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