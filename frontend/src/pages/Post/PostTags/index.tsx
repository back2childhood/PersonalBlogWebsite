import React from 'react';

import s from './index.scss';

interface Props {
  tags: { id: number, name: string }[];
}

const PostTags: React.FC<Props> = ({ tags }) => {
  return (
    <div className={s.articleTags}>
      {tags.map((item, index) => (
        <span className={s.articleTag} key={index}>
          {item.name}
        </span>
      ))}
    </div>
  );
};

export default PostTags;
