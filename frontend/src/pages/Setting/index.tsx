import React from "react";

import Layout from "@/components/Layout";
import { Title } from "../titleconfig";
import { useRequest, useToggle } from "ahooks";
import { staleTime } from "@/utils/constant";
import MarkDown from "@/components/MarkDown";
import Publish from "./Publish";
import s from './index.scss';
import Switch from "./Switch";
import Manage from "./Manage";

const About: React.FC = () => {
    const [state, { toggle, setLeft, setRight }] = useToggle();

    const fetchData = async () => {
    }

    const { data, loading } = useRequest(
        fetchData, {
        retryCount: 3,
        //   cacheKey: `About-${DB.About}`,
        staleTime
    });

    return (
        <Layout title={Title.Setting} loading={loading}>
            <Switch state={state} toggle={toggle} setLeft={setLeft} setRight={setRight} />
            <Publish className={state ? s.hidden : ' '} />
            <Manage
                className={state ? '' : s.hidden}
            // content={data?.about.data[0].content}
            // classes={data?.classes.data}
            // artSum={data?.artSum.total}
            />
        </Layout>
    );
};

export default About;
