// apis related to article

import { request } from "@/utils";

// get channel list
export function getChannelAPI() {
    return request({
        url: '/channel',
        method: 'GET'
    })
}

// submit an article
export function createArticleAPI(data) {
    return request({
        url: '/articles?draft=false',
        method: 'POST',
        data
    })
}

export function getArticleListAPI(params) {
    return request({
        url: '/articles',
        method: 'GET',
        params
    })
}