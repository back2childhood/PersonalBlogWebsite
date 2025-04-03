// functions related to user requests

import { axiosAPI } from "../axios";

// const { request } = require("@/utils");

// login
export const loginAPI = async (data: object) => {
    // console.log(data)
    return await axiosAPI(
        '/login',
        "POST",
        data
    )
    // .then(res => res)
    // .catch(err => err);
}

// get user info
export const getProfileAPI = async () => {
    return axiosAPI(
        '/profile',
        'GET'
    )
}