import { useRequest, useSafeState } from 'ahooks';
import React from 'react';

import Layout from '@/components/Layout';
import MyPagination from '@/components/MyPagination';
import { defaultPageSize, staleTime } from '@/utils/constant';

import { Title } from '../titleconfig';
import ArtList from './ArtList';
import { getArticleByKeyword } from '@/utils/apis/getArticles';
import TextBar from './TextBar';

const Search: React.FC = () => {
  const [page, setPage] = useSafeState(1);

  const [where, setWhere] = useSafeState("");

  const { data, loading, run } = useRequest(
    getArticleByKeyword,
    {
      defaultParams: [{ keyword: where, page, pagesize: defaultPageSize }],
      retryCount: 3,
      refreshDeps: [where, page],
      staleTime
    }
  );

  // console.log(data);

  return (
    <Layout title={Title.Search}>
      <TextBar page={page} setPage={setPage} where={where} setWhere={setWhere} run={run} />
      <ArtList articles={data?.data.articles} loading={loading} />
      <MyPagination
        current={page}
        defaultPageSize={defaultPageSize}
        total={data?.data.totalPages}
        setPage={setPage}
        autoScroll={true}
        scrollToTop={440}
      />
    </Layout>
  );
};

export default Search;
