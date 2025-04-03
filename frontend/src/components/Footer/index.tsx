import React from 'react';

import { source_github } from '@/utils/constant';

import s from './index.scss';

const Footer: React.FC = () => {
  const frameArr = [
    'React',
    // 'React Router',
    'Redux',
    // 'Webpack',
    'typescript',
    'ahooks',
    'Java',
    'Kafka',
    'ES',
    'postgresql'
  ];

  return (
    <footer className={s.footer}>
      <span>
        Personal Blog Website
        <a href={source_github} target='_blank' rel='noreferrer' className={s.text}>
          「source code」
        </a>
      </span>
      <span>
        {frameArr.map((item, index) => (
          <span className={s.siteFrame} key={index}>
            {item}
          </span>
        ))}
      </span>
    </footer>
  );
};

export default Footer;
