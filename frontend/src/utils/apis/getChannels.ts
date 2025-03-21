import { useRequest, useSafeState } from "ahooks"
import { axiosAPI } from "../axios"



export const getChannelList = async () => {

    // // get channel list
    // const getChannelList = () => {
    //     return axiosAPI(
    //         '/channel',
    //         'GET'
    //     )
    // }

    // const getChannelList = async () => {
    //     const res = await getChannelList()
    //     console.log(res);
    //     return res;
    // }

    const channelList = useRequest(async () => {
        return await axiosAPI(
            '/channel',
            'GET'
        )
    });

    return {
        channelList
    }
}