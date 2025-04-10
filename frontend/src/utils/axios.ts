// axios
import axios, { Method } from 'axios';
import { removeToken, getToken } from './token';
// import router from '@/router';

const request = axios.create({
    baseURL: 'http://ec2-54-153-64-0.us-west-1.compute.amazonaws.com:8080',
    // baseURL: 'http://localhost:8080', // Change this to your backend API URL
    headers: { "ngrok-skip-browser-warning": "true" }
});

const axiosAPI = (url: string, method: Method, params: object | null = {}) => {
    return request({
        url,
        method,
        data: method === 'POST' ? params : {}, // Use data for POST
        params: method !== 'POST' ? params : {}, // Use params for GET
        withCredentials: true
    })
};

// Add a request interceptor
// do something before sending the request, like process the parameters
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = getToken()
    if (token) {
        // api : config.headers.Authorization
        // `Bearer ${token}` : Protocol with the backend
        if (!config.headers) {
            config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
// do something before receving the response, process the response data
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error)
    if (error.code === "ERR_NETWORK") {
        return Promise.reject(error);
    }
    // if the token has expired, the return code is 401 
    else if (error.response.status === 401) {
        removeToken();
        // router.navigate('/login')
        // window.location.href = '/login';
        // window.location.reload()
    } else {
        return Promise.reject(error);
    }
});

export { axiosAPI }