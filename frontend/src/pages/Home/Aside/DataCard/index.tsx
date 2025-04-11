import { useRequest } from 'ahooks';
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Card from '@/components/Card';
import { setArtSum } from '@/redux/actions';
import { staleTime } from '@/utils/constant';

import s from './index.scss';
import { getSum } from '@/utils/apis/getArticles';

interface Props {
  setArtSum?: Function;
}

const DataCard: React.FC<Props> = ({ setArtSum }) => {
  const navigate = useNavigate();

  const { data, loading } = useRequest(getSum, {
    retryCount: 3,
    // cacheKey: `DataCard-count-${DB.Article}-${DB.Class}-${DB.Tag}`,
    staleTime,
    onSuccess: data => setArtSum!(data?.data.articles)
  });

  return (
    <Card className={s.card} loading={loading}>
      <div className={s.blogData} onClick={() => navigate('/articles')}>
        <div className={s.name}>Articles</div>
        <div className={s.num}>{data?.data?.articles}</div>
      </div>
      <div className={s.blogData} onClick={() => navigate('/article/tags')}>
        <div className={s.name}>tags</div>
        <div className={s.num}>{data?.data?.tags}</div>
      </div>
    </Card>
  );
};

export default connect(() => ({}), {
  setArtSum
})(DataCard);
