import { useRequest } from 'ahooks';
import React from 'react';

import Card from '@/components/Card';
import { staleTime } from '@/utils/constant';

import s from './index.scss';

const NoticeCard: React.FC = () => {

  const fetchData = async () => {
    const data = await fetch("/assets/notice.json")
      .then((res) => res.json());

    // console.log(data);
    return data;
  };

  const { data, loading } = useRequest(fetchData, {
    retryCount: 3,
    staleTime
  });

  return (
    <Card loading={loading}>
      <div className={s.notice}>{data?.notice}</div>
    </Card>
  );
};

export default NoticeCard;
