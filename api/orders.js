import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_ORDERS_API_BASE_URL;

export async function createOrder(orderData) {
    const res = await axios.post(`${BASE_URL}/orders`, orderData);
    return res.data;
}

export async function getOrdersByUser(userId) {
    const res = await axios.get(`${BASE_URL}/orders`);
    return res.data.filter((order) => order.userId === userId);
}

export async function getOrderById(id) {
    const res = await axios.get(`${BASE_URL}/orders/${id}`);
    return res.data;
}