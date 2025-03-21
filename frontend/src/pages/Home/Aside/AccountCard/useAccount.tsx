import { GithubOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import React from 'react';

import { csdnUrl, githubUrl, InsUrl, linkedInUrl } from '@/utils/constant';

import Csdn from './Csdn';

export const useAccount = () => {
  const imgStyle = { width: '120px', height: '120px' };

  return [
    {
      isLink: true,
      link: githubUrl,
      ico: <GithubOutlined />,
      content: null
    },
    {
      isLink: true,
      link: csdnUrl,
      ico: <Csdn />,
      content: null
    },
    {
      isLink: true,
      link: InsUrl,
      ico: <InstagramOutlined />,
      content: null
      // content: <img src={InsUrl} style={imgStyle} />
    },
    {
      isLink: true,
      link: linkedInUrl,
      ico: <LinkedinOutlined />,
      content: null
    }
  ];
};
