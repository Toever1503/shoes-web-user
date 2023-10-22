import { type App } from "vue";
import address from '~/data/address_vn.json'


const readFileBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const debounce = (func: Function, delay = 500) => {
    let debounceTimer: NodeJS.Timeout | undefined;
    return function () {
        // @ts-ignore
        const context = this;
        // eslint-disable-next-line prefer-rest-params
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};
const color =
    [
        "orange",
        "pink",
        "green",
        "cyan",
        "blue",
        "purple",
        "#108ee9",
        "#f50",
        "#2db7f5",
        "#87d068",
        "default",
    ];

const getProvinces = (payload: { p: number }) => {
    const { p } = payload;
    let dataResponse: any[] = [];
    let hasP = false;

    console.log('address: ', address)
    if (p) {
        if (!isNaN(p)) {
            hasP = true;
            dataResponse = address.filter((item) => item.code == p);
        }
    }
    if (!hasP)
        dataResponse = address.map(
            item =>
            ({
                code: item.code,
                name: item.name
            })
        );

    return dataResponse;
}
export default defineNuxtPlugin((nuxtApp) => {
    const app = nuxtApp.vueApp;
    app.provide("readFileBase64", readFileBase64);
        app.provide("debounce", debounce);
        app.provide("getRandomColor", () => color[Math.floor(Math.random() * color.length)]);
        app.provide("getProvinces", getProvinces);
});