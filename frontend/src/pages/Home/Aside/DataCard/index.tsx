import { useRequest } from 'ahooks';
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Card from '@/components/Card';
import { setArtSum } from '@/redux/actions';
import { staleTime } from '@/utils/constant';

import { fetchData } from './fetchData';
import s from './index.scss';

interface Props {
  setArtSum?: Function;
}

const DataCard: React.FC<Props> = ({ setArtSum }) => {
  const navigate = useNavigate();
  const { data, loading } = useRequest(fetchData, {
    retryCount: 3,
    // cacheKey: `DataCard-count-${DB.Article}-${DB.Class}-${DB.Tag}`,
    staleTime,
    onSuccess: data => setArtSum!(data?.articles.total)
  });

  return (
    <Card className={s.card} loading={loading}>
      <div className={s.blogData} onClick={() => navigate('/articles')}>
        <div className={s.name}>Articles</div>
        <div className={s.num}>{data?.articles}</div>
      </div>
      <div className={s.blogData} onClick={() => navigate('/channels')}>
        <div className={s.name}>channels</div>
        <div className={s.num}>{data?.channels}</div>
      </div>
    </Card>
  );
};

export default connect(() => ({}), {
  setArtSum
})(DataCard);
