import { useRequest } from 'ahooks';
import React from 'react';

import Card from '@/components/Card';
// import { getSiteCount } from '@/utils/apis/getSiteCount';
import { siteCountStale } from '@/utils/constant';

import s from './index.scss';
import { useRunTime } from './useRunTime';

const SiteCard: React.FC = () => {
  const { runTime } = useRunTime();

  const getSiteCount = () => {
    const data = fetch("/assets/site.json")
      .then((res) => res.json())
    return data;
  }

  const { data, loading } = useRequest(getSiteCount, {
    retryCount: 3,
    staleTime: siteCountStale
  });

  return (
    <Card className={s.card} loading={loading}>
      <div className={s.item}>
        <span className={s.key}>Views</span>
        <span className={s.value}>{data?.count}times</span>
      </div>
      <div className={s.item}>
        <span className={s.key}>Run Time</span>
        <span className={s.value}>{runTime}days</span>
      </div>
    </Card>
  );
};

export default SiteCard;
