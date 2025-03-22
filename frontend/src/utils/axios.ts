// axios
import axios, { Method } from 'axios';
import { removeToken, getToken } from './token';
// import router from '@/router';

const request = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { "ngrok-skip-browser-warning": "true" }
});

const axiosAPI = (url: string, method: Method, params: object | null = {}) => {
    return request({
        url,
        method,
        params: params ?? {}, // Ensure it's always an object
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
        window.location.href = '/login';
        window.location.reload()
    } else {
        return Promise.reject(error);
    }
});

export { axiosAPI }