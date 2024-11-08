import axios from 'axios';


const url = [
    'https://file-transfer-app-backend.onrender.com/api/v1',
    'http://localhost:4000/api/v1'
];
  
// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: url[1], 
    timeout: 30000, // Optional: request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${JSON.stringify(token)}`;
        }
        return config;
    },
    (error) => {
        console.log('somesome',error)
        // return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
        if (response && response.status === 401) {
            console.log('yeah')

         }
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
        }
        console.log(error)
    }
);

export default axiosInstance;
