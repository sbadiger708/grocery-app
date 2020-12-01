import axios from 'axios';
import { BASE_URL } from '../common';

const token = localStorage.getItem('token');
const headers = { 'jwt_token': token };

export function getAllGroceries() {
    return axios.get(`${BASE_URL}/api/dashboard/grocery`, {headers});
}

export function getAllCartItems() {
    return axios.get(`${BASE_URL}/api/cart`, {headers});
}

export function addToCart(grocery) {
    return axios.post(`${BASE_URL}/api/cart/add`, grocery, {headers});
}

export function removeItemFromCart(id) {
    return axios.delete(`${BASE_URL}/api/cart/delete/${id}`, {headers});
}

export function addNewGrocery(newGrocery) {
    return axios.post(`${BASE_URL}/api/dashboard/grocery`, newGrocery, {headers});
}

export function updateGroceryById(editGrocery) {
    return axios.put(`${BASE_URL}/api/dashboard/grocery/${editGrocery.id}`, editGrocery, {headers});
}