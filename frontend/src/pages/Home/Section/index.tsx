import { useRequest, useSafeState } from 'ahooks';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MyPagination from '@/components/MyPagination';
import { storeState } from '@/redux/interface';
// import { getPageData } from '@/utils/apis/getPageData';
import { defaultPageSize, staleTime } from '@/utils/constant';

import s from './index.scss';
import PostCard from './PostCard';
import { getArticles } from '@/utils/apis/getArticles';

interface theAtc {
  content: string;
  createTime: string;
  tags: { id: number, name: string }[];
  title: string;
  url: string;
  id: string;
  userId: string;
}

interface Props {
  artSum?: number;
}

const Section: React.FC<Props> = ({ artSum }) => {
  const navigate = useNavigate();
  const [page, setPage] = useSafeState(1);

  const { data, loading, run } = useRequest(
    getArticles,
    {
      // defaultParams: [{ page: page, pagesize: defaultPageSize }],
      manual: true,
      retryCount: 3,
      // refreshDeps: [page],
      // staleTime
    }
  );

  useEffect(() => {
    run({ page, pagesize: defaultPageSize });
  }, [page]);

  return (
    <section className={s.section}>
      {data?.data.articles.map(({ id, title, content, createTime, tags, userId }: theAtc) => (
        <PostCard
          key={id}
          title={title}
          content={content}
          createTime={createTime}
          tags={tags}
          userId={userId}
          loading={loading}
          onClick={() => navigate(`/article/details/${id}`)}
        />
      ))}
      <MyPagination
        current={page}
        defaultPageSize={defaultPageSize}
        total={artSum}
        page={page}
        setPage={setPage}
        autoScroll={true}
        scrollToTop={document.body.clientHeight - 80}
      />
    </section>
  );
};

export default connect((state: storeState) => ({ artSum: state.artSum }))(Section);
