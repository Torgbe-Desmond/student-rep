import axiosInstance from "./AxiosInstance";

// Function to handle user login
async function login(credentials) {
    const response = await axiosInstance.post(`/auth/login`, credentials);
    return response.data;
}

// Function to handle user registration
async function register(userInfo) {
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

// Function to send logout link
async function logout() {
    const response = await axiosInstance.post(`/auth/logout`)
    return response.data;
}


async function verifyEmail(email) {
    const response = await axiosInstance.post(`/auth/send-email-verification`, { email });
    return response.data;
}


async function getVerificationToken(reference_Id) {
    const response = await axiosInstance.get(`/auth/${reference_Id}/get-verification-token`);
    return response.data;
}


// Function to handle forgot password
async function updatePassword(newPassword) {
      const token = localStorage.getItem('verificationToken');
      if (!token) {
        throw new Error('User is not authenticated. Token is missing.');
      }
      const response = await axiosInstance.post(
        '/auth/update-password',
        { newPassword },
        {
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data;
  }

// Function to get all users
async function getAll() {
    const response = await axiosInstance.get(`/auth/all`);
    return response.data;
}

export const AuthService = {
    login,
    logout,
    register,
    deleteUser,
    verifyEmail,
    sendRecoveryLink,
    updatePassword,
    getVerificationToken,
    getAll,
};
