import React from "react";

import Layout from "@/components/Layout";
import { Title } from "../titleconfig";
import { useRequest } from "ahooks";
import { staleTime } from "@/utils/constant";
import MarkDown from "@/components/MarkDown";

const Setting: React.FC = () => {

    const getData = async () => {
        const data = await fetch('/assets/setting.json')
            .then((res) => res.json())

        // console.log(data.placeholder);
        return data.placeholder;
    }

    const { data, loading } = useRequest(getData, {
        retryCount: 3,
        staleTime
    });

    return (
        <Layout title={Title.Setting} loading={loading}>
            <div>
                <MarkDown content={data || ''} />
            </div>
        </Layout>
    );
};

export default Setting;
