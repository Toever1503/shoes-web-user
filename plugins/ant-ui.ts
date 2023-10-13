import Antd from 'ant-design-vue';
// import 'ant-design-vue/es/message/style/css';
// import 'ant-design-vue/es/notification/style/css';
// import 'ant-design-vue/es/modal/style/css';
// import 'ant-design-vue/dist/antd.min.css';
import 'ant-design-vue/dist/reset.css';
import {message} from "ant-design-vue";
message.config({
    maxCount: 3,
    duration: 1
})
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Antd);
});