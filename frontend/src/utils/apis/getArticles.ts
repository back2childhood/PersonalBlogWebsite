// apis related to article

import { axiosAPI } from "../axios";



// submit an article
export function createArticleAPI(data: object) {
    return axiosAPI(
        '/articles?draft=false',
        'POST',
        data
    )
}

export function getArticleListAPI(params: object) {
    return axiosAPI(
        '/articles',
        'GET',
        params
    )
}