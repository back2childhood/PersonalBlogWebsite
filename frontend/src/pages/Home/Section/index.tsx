import { useRequest, useSafeState } from 'ahooks';
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MyPagination from '@/components/MyPagination';
import { storeState } from '@/redux/interface';
// import { getPageData } from '@/utils/apis/getPageData';
import { homeSize, staleTime } from '@/utils/constant';

import s from './index.scss';
import PostCard from './PostCard';

interface theAtc {
  classes: string;
  content: string;
  date: number;
  channels: string[];
  title: string;
  url: string;
  _id: string;
  _openid: string;
}

interface Props {
  artSum?: number;
}

const Section: React.FC<Props> = ({ artSum }) => {
  const navigate = useNavigate();
  const [page, setPage] = useSafeState(1);

  const getArticles = async () => {
    const data = await fetch("/assets/articles.json")
      .then(res => res.json())

    // console.log(data)
    return data;
  }

  const { data, loading } = useRequest(
    getArticles,
    {
      retryCount: 3,
      refreshDeps: [page],
      // cacheKey: `Section-${DB.Article}-${page}`,
      staleTime
    }
  );

  return (
    <section className={s.section}>
      {data?.map(({ _id, title, content, date, channels }: theAtc) => (
        <PostCard
          key={_id}
          title={title}
          content={content}
          date={date}
          channels={channels}
          loading={loading}
          onClick={() => navigate(`/article/${_id}`)}
        />
      ))}
      <MyPagination
        current={page}
        defaultPageSize={homeSize}
        total={artSum}
        setPage={setPage}
        autoScroll={true}
        scrollToTop={document.body.clientHeight - 80}
      />
    </section>
  );
};

export default connect((state: storeState) => ({ artSum: state.artSum }))(Section);
