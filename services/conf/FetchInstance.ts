const baseApiUrl = 'http://localhost:8082/v1';
// const baseApiUrl = 'https://shoes.orisu.lol/v1';

const commonBase = (payload: any, headers: any): any => {
    return (
        {
            body: payload,
            // credentials: 'include',
            headers: {
                ...getAuthHeader(), ...headers
            },
            onRequestError(context: any, error: any){
                console.log("oncall API failed", context, error);
            }
        }
    )
}

const post = (url: string, payload: any, headers = {}) => {
    return $fetch(baseApiUrl + url, {
        method: 'POST',
        ...commonBase(payload, headers)
    });
};

const put = (url: string, payload: any, headers = {}) => {
    return $fetch(baseApiUrl + url, {
        method: 'PUT',
        ...commonBase(payload, headers)
    });
}

const patch = (url: string, payload: any, headers = {}) => {
    return $fetch(baseApiUrl + url, {
        method: 'PATCH',
        ...commonBase(payload, headers)
    });
}

const get = (url: string, headers = {}) => {
    return $fetch(baseApiUrl + url, {
        method: 'GET',
        headers: {
            ...getAuthHeader(), ...headers
        }
    });
}

const del = (url: string, payload: any = {}, headers = {}) => {
    return $fetch(baseApiUrl + url, {
        method: 'DELETE',
        ...commonBase(payload, headers)
    });
}

const getAuthHeader = () => {
    try {
        const token = localStorage.getItem('loggedUser');
        // const token = getCookie('token');
        if (token)
            return { 'x-api-token': token };
    } catch (e) {
        return {};
    }
    return {}
}

function getCookie(cName: string) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
}

// date expire date is seconds
function setCookie(cookie_name: string, cookie_value: string, expire_date: number) {
    const c_d = new Date(); // current date
    c_d.setTime(c_d.getTime() + (expire_date * 1000));
    let expires = "expires=" + c_d.toUTCString();
    document.cookie = cookie_name + "=" + cookie_value + "; " + expires + "; path=/";
}

const fetchInstance = {
    post,
    put,
    patch,
    get,
    del,
    getCookie,
    setCookie
}

export default fetchInstance;