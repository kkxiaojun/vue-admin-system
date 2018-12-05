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