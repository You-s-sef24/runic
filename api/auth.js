import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function loginUser({ email, password }) {
    const res = await axios.get(`${BASE_URL}/users`);

    const matchedUser = res.data.find(
        (u) => u.email === email && u.password === password
    );

    if (!matchedUser) {
        throw new Error("Invalid email or password");
    }

    if (matchedUser.isAdmin) {
        throw new Error("Admin accounts must sign in through the admin panel");
    }

    const { password: _password, ...safeUser } = matchedUser;
    return safeUser;
}

export async function registerUser({ name, email, password, phone }) {
    const res = await axios.get(`${BASE_URL}/users`);

    if (res.data.some((u) => u.email === email)) {
        throw new Error("An account with this email already exists");
    }

    const created = await axios.post(`${BASE_URL}/users`, {
        name,
        email,
        password,
        phone,
        isAdmin: false,
        createdAt: Math.floor(Date.now() / 1000),
    });

    const { password: _password, ...safeUser } = created.data;
    return safeUser;
}