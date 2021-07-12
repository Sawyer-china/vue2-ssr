// import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const request = axios.create({
    baseURL: 'http://192.168.10.207',
    timeout: 5000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
});

request.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        config.headers['Authorization'] = 'BearereyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly8xOTIuMTY4LjEwLjIwNy9hcGkvbG9naW4vbG9naW4iLCJpYXQiOjE2MjU3MjUzMTUsImV4cCI6MTY1NzI2MTMxNSwibmJmIjoxNjI1NzI1MzE1LCJqdGkiOiJPaWEyT1JSa0JWaVVhREZuIn0.la-fK-Len_JruzkKhTzJmrsUpnzF7I3FWDSYuESPwD8'
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
request.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

export default request;
