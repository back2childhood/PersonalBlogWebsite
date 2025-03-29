import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import DisplayBar from '@/components/DisplayBar';
import { ArticleType } from '@/pages/constant';

import s from './index.scss';

interface Props {
  articles?: ArticleType[];
  loading?: boolean;
}

const ArtList: React.FC<Props> = ({ articles, loading }) => {
  const navigate = useNavigate();

  return (
    <>
      {articles?.length ? (
        articles?.map((item: ArticleType) => (
          <DisplayBar
            key={item.id}
            content={item.title}
            right={item.createTime.substring(0, 10)}
            onClick={() => navigate(`/article/details/${item.id}`)}
            loading={loading}
          />
        ))
      ) : (
        <div className={s.none}>There are no eligible articles.</div>
      )}
    </>
  );
};

export default ArtList;
