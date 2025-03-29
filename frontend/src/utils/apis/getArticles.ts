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

export function getArticles(_data: object) {
    return axiosAPI(
        '/article/page',
        'GET',
        _data
    )
}

// 
export function getArticlesByTag(data: object) {
    return axiosAPI(
        '/article/tag',
        'GET',
        data
    )
}

// get total count of articles, tags
export const getSum = async () => {
    return await axiosAPI("/article/data", "GET")
    // .then(res => res)
    // .catch(err => err);
}

export const getArticleById = async (id: string) => {
    return await axiosAPI(`/article/details/${id}`, "GET")
    // .then(res => res)
    // .catch(err => err);
}

export const getArticleByKeyword = async (data: object) => {
    // console.log(data);
    return await axiosAPI(
        '/article/search',
        "GET",
        data
    )
}