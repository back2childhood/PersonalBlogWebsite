import { useRequest } from 'ahooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '@/components/Layout';
import { getArticlesByTag } from '@/utils/apis/getArticles';
import { staleTime } from '@/utils/constant';

import { Title } from '../titleconfig';
import s from './index.scss';
import { getTagList } from '@/utils/apis/getTags';

interface TagType {
  id: string;
  name: string;
}

const Tags: React.FC = () => {
  const navigate = useNavigate();

  const { data, loading } = useRequest(getTagList, {
    retryCount: 3,
    staleTime
  });

  // console.log(data)

  return (
    <Layout title={Title.Tags} loading={loading} className={s.tagsBox} rows={3}>
      {data?.data?.tags.map((item: TagType) => (
        <span
          className={s.tagItem}
          key={item.id}
          onClick={() => navigate(`/article/tag/${item.name}`)}
        >
          {item.name}
        </span>
      ))}
    </Layout>
  );
};

export default Tags;
