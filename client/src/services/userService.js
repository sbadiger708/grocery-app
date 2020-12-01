import axios from 'axios';
import { BASE_URL } from '../common';

const token = localStorage.getItem('token');

export function signupUser(newUser) {
    return axios.post(`${BASE_URL}/api/auth/register`, newUser);
}

export function loginUser(authUser) {
    return axios.post(`${BASE_URL}/api/auth/login`, authUser);
}

export function verifyToken() {
    return axios.get(`${BASE_URL}/api/user/userContext`, {
        headers: {
            'jwt_token': token
        }
    });
}