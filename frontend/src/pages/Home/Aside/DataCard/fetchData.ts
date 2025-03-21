import { getSum } from '@/utils/apis/getSum';

export const fetchData = async () => {
  const [articles, channels] = await Promise.all([
    getSum('articles'),
    getSum('channels')
  ]);

  return {
    articles,
    channels
  };
};
