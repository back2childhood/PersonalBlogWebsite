// functions related to user requests

const { request } = require("@/utils");

// login
export function loginAPI(formData) {
    return request({
        url: '/login',
        method: 'POST',
        data: formData
    })
}

// get user info
export function getProfileAPI() {
    return request({
        url: '/profile',
        method: 'GET'
    })
}