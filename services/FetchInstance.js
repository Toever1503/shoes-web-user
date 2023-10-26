function getCookie(cName) {
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
function setCookie(cookie_name, cookie_value, expire_date) {
    const c_d = new Date(); // current date
    c_d.setTime(c_d.getTime() + (expire_date * 1000));
    let expires = "expires=" + c_d.toUTCString();
    document.cookie = cookie_name + "=" + cookie_value + "; " + expires + "; path=/";
}

export const fetchInstance = {
    getCookie,
    setCookie
};