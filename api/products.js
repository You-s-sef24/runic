import axios from "axios";

export async function getFeaturedProducts() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`)
    return res.data;
}

export async function getProducts({ page = 1, limit = 8, sortBy, order, category } = {}) {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
        { params: { page, limit, sortBy, order, category } }
    );
    return res.data;
}

export async function getProductById(id) {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`
    );
    return res.data;
}