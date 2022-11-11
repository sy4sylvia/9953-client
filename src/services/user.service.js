import axios from 'axios';

const API_URL = 'http://localhost:3000/api/test/';

// HttpOnly Cookies will be automatically sent along with HTTP requests,
// so we just simply use Axios without caring JWT.

// TODO: naming below?
const getPublicContent = () => {
    return axios.get(API_URL + 'all');
}

const getUserAccount = () => {
    return axios.get(API_URL + 'user');
}

const UserService = {
    getPublicContent,
    getUserAccount,
}

export default UserService;