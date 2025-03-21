import { useRequest } from 'ahooks';
import React from 'react';

import Card from '@/components/Card';
import { staleTime } from '@/utils/constant';

import s from './index.scss';
import { getChannelList } from '@/utils/apis/getChannels';

const ChannelCard: React.FC = () => {

  // const getData = async () => {
  //   const data = await fetch("/assets/channels.json")
  //     .then((res) => res.json());

  //   return data.channels;
  // }

  const { data, loading } = useRequest(getChannelList, {
    retryCount: 3,
    staleTime
  });

  return (
    <Card className={s.card} loading={loading}>
      {data?.map(
        (item: { channel: string }, count: number) => (
          <span className={s.channel} key={count}>
            {item.channel}
          </span>
        )
      )}

      {/* {data?.map(
        (item: { _id: string; _openid: string; tag: string }, index: number) => (
          <span className={s.tag} key={index}>
            {item.tag}
          </span>
        )
      )} */}
    </Card>
  );
};

export default ChannelCard;
