import dayjs from 'dayjs';
import React, { MouseEventHandler, useEffect, useState } from 'react';

import Card from '@/components/Card';

import s from './index.scss';
import PostCardLoading from './PostCardLoading';

interface Props {
  title?: string;
  content?: string;
  createTime?: string;
  tags?: { id: number, name: string }[];
  userId?: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}


const PostCard: React.FC<Props> = ({ title, content, createTime, tags, userId, loading, onClick }) => {

  return (
    <Card className={s.card} isStatic={true} onClick={onClick}>
      {loading ? (
        <PostCardLoading />
      ) : (
        <>
          <div className={s.title}>{title}</div>
          <p className={s.content}>
            {content!.replace(/<a(.*?)>(.*?)<\/a>/g, '$2').replace(/[#|**|`|>]/g, '')}
          </p>
          <div className={s.info}>
            <span className={s.date}>{createTime?.substring(0, 10)}</span>
            {/* <span className={s.date}>{getUserInfo(userId)}</span> */}
            <div className={s.tags}>
              {tags!.map(tag => (
                <span className={s.tag} key={tag.id}>
                  {tag.name}
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
