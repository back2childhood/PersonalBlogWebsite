import { useRequest } from 'ahooks';
import React from 'react';

// import Comment from '@/components/Comment';
import Layout from '@/components/Layout';
import MarkDown from '@/components/MarkDown';
import { staleTime } from '@/utils/constant';

import CopyRight from './CopyRight';
import s from './index.scss';
import Navbar from './Navbar';
import PostTags from './PostTags';
import { getArticleById } from '@/utils/apis/getArticles';
import { useParams } from 'react-router-dom';

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useRequest(getArticleById, {
    defaultParams: [id || ''],
    retryCount: 3,
    // cacheKey: `Post-${DB.Article}-${search.title}`,
    staleTime
  });

  return (
    <Layout
      title={data?.data.title}
      loading={loading}
      // classes={data?.data.classes}
      date={data?.data.createTime}
      isPost={true}
      rows={14}
    >
      <MarkDown content={data?.data.content} className={s.mb} />
      <PostTags tags={data?.data.tags} />
      <CopyRight id={data?.data.id} title={data?.data.title} />
      {/* <Comment titleEng={search.title} title={data?.data[0].title} /> */}
      <Navbar content={data?.data.content} />
    </Layout>
  );
};

export default Post;
