import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function updateUser(id, data) {
    const res = await axios.put(`${BASE_URL}/users/${id}`, data);
    return res.data;
}

export async function getUserById(id) {
    const res = await axios.get(`${BASE_URL}/users/${id}`);
    return res.data;
}