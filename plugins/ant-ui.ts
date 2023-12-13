import { ConfigProvider } from "ant-design-vue";

ConfigProvider.config({
    theme: {
        primaryColor: '#f79837'
    },
})
message.config({
    maxCount: 3,
    duration: 1
});
notification.config({
    maxCount: 3,
    duration: 1.5
});

export default defineNuxtPlugin((nuxtApp) => {
});