import axios from "axios";

let axiosInstance = null;
function getInstance() {
    if (axiosInstance != null) {
        return axiosInstance
    }
    axiosInstance = axios.create({
        baseURL: "http://localhost:8082/v1",
        headers: {},
    });

    //hook interceptor cài ở đây
    axiosInstance.interceptors.request.use((config) => {
        const token = localStorage.getItem('loggedUser');
        if (token) {
            config.headers["x-api-token"] = token;
        }
        return config;
    })

    axiosInstance.interceptors.response.use((response) => {
        return response;
    },
        async (error) => {
            // if (error.response.status === 401) {
            //     localStorage.removeItem('token');
            //     window.location.href = '/signin';
            // }

            // if (error.response.data)
            //     if (error.response.data.code === "code-4") {
            //         window.location.href =
            //             "/login?redirectTo=" + window.location.pathname;
            //     }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}

function get(endpointApiUrl, payload = {}) {
    return getInstance().get(endpointApiUrl, {
        params: payload,
    });
}

function post(endpointApiUrl, payload = {}, headers = {}) {
    return getInstance().post(endpointApiUrl, payload, {
        headers: headers,
    });
}

function put(endpointApiUrl, payload = {}) {
    return getInstance().put(endpointApiUrl, payload);
}
function patch(endpointApiUrl, payload = {}) {
    return getInstance().patch(endpointApiUrl, payload);
}

function del(endpointApiUrl, payload = {}) {
    return getInstance().delete(endpointApiUrl, { data: payload });
}

function de(endpointApiUrl, payload = {}) {
    return getInstance().delete(endpointApiUrl, { data: payload });
}


function setCookie(name, value, timeIn) {
    var expires = "";
    if (timeIn) {
        var date = new Date();
        date.setTime(date.getTime() + (timeIn * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export default {
    axiosInstance,
    get,
    post,
    put,
    patch,
    del,
    de,
};