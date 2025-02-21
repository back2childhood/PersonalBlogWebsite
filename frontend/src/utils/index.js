// import all of the utils into this file and export them together.
// so we only need to import the index.js file in other file.
import { request } from "./request";
import { setToken, getToken, removeToken } from './token'

export {
    request,
    setToken,
    getToken,
    removeToken
}