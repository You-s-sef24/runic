import axios from "axios";

export async function getProducts() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`)
    return res.data;
}