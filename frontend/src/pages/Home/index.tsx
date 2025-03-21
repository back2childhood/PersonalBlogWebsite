import { useMount, useSafeState, useTitle } from 'ahooks';
import React from 'react';
import { connect } from 'react-redux';

import PageTitle from '@/components/PageTitle';
import { setNavShow } from '@/redux/actions';
import { siteTitle } from '@/utils/constant';
import useTop from '@/utils/hooks/useTop';

import Aside from './Aside';
import s from './index.scss';
import Section from './Section';
import { getJoke } from '@/utils/apis/getJoke';

interface Props {
  setNavShow?: Function;
}


const Home: React.FC<Props> = ({ setNavShow }) => {
  useTitle(siteTitle);
  useTop(setNavShow);

  const [joke, setJoke] = useSafeState('');
  useMount(() => {
    getJoke().then(
      // (res: {
      //   joke: string;
      // }) => setJoke(res.joke)
      res => setJoke(res)
    );
  });

  return (
    <>
      <PageTitle title={siteTitle} desc={joke || ''} className={s.homeTitle} />
      <div className={s.body}>
        <Section />
        <Aside />
      </div>
    </>
  );
};

export default connect(() => ({}), { setNavShow })(Home);
