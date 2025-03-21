// functions related to user requests

import { axiosAPI } from "../axios";

const { request } = require("@/utils");

// login
export function loginAPI(formData: object) {
    return axiosAPI(
        '/login',
        'POST',
        formData
    )
}

// get user info
export function getProfileAPI() {
    return axiosAPI(
        '/profile',
        'GET'
    )
}