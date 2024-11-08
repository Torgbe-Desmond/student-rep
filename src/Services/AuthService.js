import axiosInstance from "./AxiosInstance";

// const API_BASE_URL = 'http://localhost:3000/api/v1/auth'

// Function to handle user login
async function login(credentials) {
    const response = await axiosInstance.post(`/auth/login`, credentials);
    return response.data;
}

// Function to handle user registration
async function register(userInfo) {
    console.log('userInfo',userInfo)
    const response = await axiosInstance.post(`/auth/register`, userInfo);
    return response.data;
}

// Function to delete user
async function deleteUser(token, userId) {
    const response = await axiosInstance.post(`/auth/delete`, { userId });
    return response.data;
}

// Function to send recovery link
async function sendRecoveryLink(email) {
    const response = await axiosInstance.get(`/auth/recovery`, {
        params: { email }
    });
    return response.data;
}

// Function to handle forgot password
async function forgotPassword(token, email) {
    const response = await axiosInstance.post(`/auth/forgot-password`, { email });
    return response.data;
}

// Function to get all users
async function getAll() {
    const response = await axiosInstance.get(`/auth/all`);
    return response.data;
}

async function studentLogin(credentials){
    const response = await axiosInstance.post(`/auth/student-login`, credentials);
    return response.data;
}

export const AuthService = {
    login,
    register,
    deleteUser,
    sendRecoveryLink,
    forgotPassword,
    getAll,
    studentLogin
};
