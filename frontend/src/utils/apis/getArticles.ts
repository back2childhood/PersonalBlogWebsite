// apis related to article
import { axiosAPI } from "../axios";



// submit an article
export function createArticle(data: object) {
    return axiosAPI(
        '/article/?draft=false',
        'POST',
        data
    )
}

export function getArticles(data: object) {
    return axiosAPI(
        '/article/page',
        'GET',
        data
    )
}

// 
export function getArticlesByTag() {
    return axiosAPI(
        '/article/tag/{tagid}',
        'GET'
    )
}

// get total count of articles, tags
export const getSum = async () => {
    return await axiosAPI("/article/data", "GET")
    // .then(res => res)
    // .catch(err => err);
}