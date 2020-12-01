import axios from 'axios';
import { BASE_URL } from '../common';

const token = localStorage.getItem('token');
const headers = { 'jwt_token': token };

export function addPayment(newPayment) {
    return axios.post(`${BASE_URL}/api/payment/add`, newPayment, {headers});
}

export function getPayments() {
    return axios.get(`${BASE_URL}/api/payment`, {headers});
}