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
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}