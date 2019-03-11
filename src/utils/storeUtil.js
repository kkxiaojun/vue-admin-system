const COMMON_PARAMS = {
    REMEMBERDAY: 1,
}

/**
 * set the localStorage
 * @param {String} name 
 * @param {String} content 
 */
export const setStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}
/**
 * get the localStorage
 * @param {String} name 
 */
export const getStore = (name) => {
    if (!name) return
    return window.localStorage.getItem(name)
}
/**
 * remove the localStorage
 * @param {String} name 
 */
export const removeStore = (name) => {
    if (!name) return
    window.localStorage.removeItem(name)
}
export const setCookie = (name, value) => {
    // 24 * 60 * 60 * 1000
    var exp = new Date();
    exp.setTime(exp.getTime() + COMMON_PARAMS.REMEMBERDAY * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}
export const getCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    else {
        return null;
    }
}
export const removeCookie = (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
    }
}