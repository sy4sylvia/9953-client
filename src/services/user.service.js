import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/admin/'

const getPublicContent = () => {
    return axios.get(API_URL);
}

const getCustomerAccount = () => {
    return axios.get(API_URL + 'customer', { headers: authHeader() });
}

const UserService = {
    getPublicContent,
    getCustomerAccount,
}

export default UserService;