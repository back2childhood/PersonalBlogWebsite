import { useRequest, useSafeState } from 'ahooks';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DisplayBar from '@/components/DisplayBar';
import Layout from '@/components/Layout';
import MyPagination from '@/components/MyPagination';
import { detailPostSize, staleTime } from '@/utils/constant';

import { ArticleType } from '../constant';
import { getArticlesByTag } from '@/utils/apis/getArticles';

const ArtDetail: React.FC = () => {
  const { name } = useParams();

  const navigate = useNavigate();

  const [page, setPage] = useSafeState(1);

  const { data, loading } = useRequest(
    getArticlesByTag,
    {
      defaultParams: [{ tagName: name, page, pagesize: detailPostSize }],
      retryCount: 3,
      refreshDeps: [page],
      // cacheKey: `ArtDetail-${DB.Article}-${JSON.stringify(where)}-${page}`,
      staleTime
    }
  );

  return (
    <Layout title={name}>
      {data?.data.articles.map((item: ArticleType) => (
        <DisplayBar
          key={item.id}
          content={item.title}
          right={item.createTime?.substring(0, 10)}
          loading={loading}
          onClick={() => navigate(`/article/details/${item.id}`)}
        />
      ))}
      <MyPagination
        current={page}
        defaultPageSize={detailPostSize}
        total={data?.data.totalPages}
        setPage={setPage}
        autoScroll={true}
        scrollToTop={440}
      />
    </Layout>
  );
};

export default ArtDetail;
