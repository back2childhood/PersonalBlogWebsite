import dayjs from 'dayjs';
import React, { MouseEventHandler, useEffect, useState } from 'react';

import Card from '@/components/Card';

import s from './index.scss';
import PostCardLoading from './PostCardLoading';
import { getJoke } from '@/utils/apis/getJoke';

interface Props {
  title?: string;
  content?: string;
  date?: number;
  channels?: string[];
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}


const PostCard: React.FC<Props> = ({ title, content, date, channels, loading, onClick }) => {


  const [joke, setJoke] = useState<string>('');

  useEffect(() => {
    const fetchJoke = async () => {
      const joke = await getJoke();
      setJoke(joke);
    };

    fetchJoke();
  }, []);

  return (
    <Card className={s.card} isStatic={true} onClick={onClick}>
      {loading ? (
        <PostCardLoading />
      ) : (
        <>
          <div className={s.title}>{title}</div>
          <p className={s.content}>
            {/* {content!.replace(/<a(.*?)>(.*?)<\/a>/g, '$2').replace(/[# |**|`|>]/g, '')} */}
            {joke}
          </p>
          <div className={s.info}>
            <span className={s.date}>{dayjs(date!).format('YYYY-MM-DD')}</span>
            <div className={s.channels}>
              {channels!.map(channel => (
                <span className={s.channel} key={channel}>
                  {channel}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default PostCard;
