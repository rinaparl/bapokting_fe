import axios from "axios";
import Cookie from "js-cookie"

const axiosApiIntances = axios.create({
    baseURL: 'http://localhost:5000'
    // baseURL: 'https://bapokting-backend.vercel.app/'
})

// Add a request interceptor
axiosApiIntances.interceptors.request.use(function (config) {
    config.headers = {
        Authorization: `Bearer ${Cookie.get("token")}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


// Add a response interceptor
axiosApiIntances.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error.response)
    if (error.response.status === 403) {
        Cookie.remove("token");
        window.location.href = "/login" // sesuaikan path login
    }
    return Promise.reject(error);
});

export default axiosApiIntances