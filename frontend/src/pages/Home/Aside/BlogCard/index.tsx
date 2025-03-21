import React from 'react';

import Card from '@/components/Card';
import { cardUrl } from '@/utils/constant';
import { useTime } from '@/utils/hooks/useTime';

import s from './index.scss';

const BlogCard: React.FC = () => {
  const { timeText } = useTime();

  return (
    <Card className={s.card}>
      <p className={s.text}>
        {timeText}，<br />
        I'm <span className={s.color}>Jili</span>，<br />
        Welcome to my
        <br />
        <span className={s.color}>BLOG</span>.
      </p>
      <img src={cardUrl} className={s.avatar} />
    </Card>
  );
};

export default BlogCard;
