import Axios from './conf/Axios';

const basePath = ''

const login = (payload) => Axios.post(`${basePath}/auth/sign-in`, payload);

const register = (payload) => Axios.post(`${basePath}/user/sign-up`, payload);

const account_detail = () => Axios.get(`${basePath}/user/detail`);

const logout = (payload) => Axios.post(`${basePath}/auth/log-out/${payload}`);

const updateAccount = (payload) => Axios.put(`${basePath}/user/update-profile`, payload);

export const authService = {
    login,
    register,
    account_detail,
    updateAccount,
};