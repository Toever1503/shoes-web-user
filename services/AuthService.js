import Axios from './conf/Axios';

const basePath = ''

const login = (payload) => Axios.post(`${basePath}/auth/sign-in`, payload);

const register = (payload) => Axios.post(`${basePath}/user/sign-up`, payload);

const account_detail = (payload) => Axios.get(`${basePath}/user/account-detail`, payload);

export const authService = {
    login,
    register
};