import { useRequest } from 'ahooks';
import React from 'react';

import Card from '@/components/Card';
import { staleTime } from '@/utils/constant';

import s from './index.scss';
import { getTagList } from '@/utils/apis/getTags';

const TagCard: React.FC = () => {

  // const getData = async () => {
  //   const data = await fetch("/assets/tags.json")
  //     .then((res) => res.json());

  //   return data.tags;
  // }

  const { data, loading } = useRequest(getTagList, {
    retryCount: 3,
    staleTime
  });

  // console.log(data)

  return (
    <Card className={s.card} loading={loading}>
      {data?.data?.tags?.map(
        (item: { id: string, name: string }, count: number) => (
          <span className={s.name} key={count}>
            {item.name}
          </span>
        )
      )}
    </Card>
  );
};

export default TagCard;
