import Axios from './conf/Axios';

const basePath = ''

const login = (payload) => Axios.post(`${basePath}/auth/sign-in`, payload);

const register = (payload) => Axios.post(`${basePath}/user/sign-up`, payload);

const account_detail = () => Axios.get(`${basePath}/user/detail`);

const logout = (payload) => Axios.post(`${basePath}/auth/log-out/${payload}`);

const updateAccount = (payload) => Axios.put(`${basePath}/user/update-profile`, payload);

const forgotPassword = (payload) => Axios.post(`${basePath}/user/find-pw?email=${payload}`);

const forgotPassId = (payload) => Axios.get(`${basePath}/user/token?token=${payload}`);

const submitforgotPass = (payload,id) => Axios.put(`${basePath}/user/forgot-pass/${id}`, payload);

const changePassword = (payload) => Axios.patch(`${basePath}/user/password`, payload);
export const authService = {
    login,
    register,
    account_detail,
    updateAccount,
    forgotPassword,
    submitforgotPass,
    forgotPassId,
    changePassword,
};