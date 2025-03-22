import { useRequest, useSafeState } from "ahooks"
import { axiosAPI } from "../axios"

export const getTagList = async () => {

    return await axiosAPI(
        '/article/tags',
        'GET'
    )

}