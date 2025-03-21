import React from 'react';

import AccountCard from './AccountCard';
import BlogCard from './BlogCard';
import ClockCard from './ClockCard';
import DataCard from './DataCard';
import s from './index.scss';
import NoticeCard from './NoticeCard';
import SiteCard from './SiteCard';
import ChannelCard from './ChannelCard';

const Aside: React.FC = () => {
  return (
    <aside className={s.aside}>
      <BlogCard />
      <AccountCard />
      <DataCard />
      <NoticeCard />
      <ClockCard />
      <div className={s.cardSticky}>
        <ChannelCard />
        <SiteCard />
      </div>
    </aside>
  );
};

export default Aside;
