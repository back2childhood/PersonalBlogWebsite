// get channel list

import { useState, useEffect } from "react"
import { getChannelAPI } from "@/apis/article"

function useChannel() {

    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        const getChannelList = async () => {
            const res = await getChannelAPI()
            console.log(res);
            setChannelList(res.data.channels)
        }
        getChannelList()
    }, [])

    return {
        channelList
    }
}

export { useChannel }