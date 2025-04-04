import './index.custom.scss';

import {
  BgColorsOutlined,
  CheckOutlined,
  HomeOutlined,
  MenuOutlined,
  SettingOutlined
} from '@ant-design/icons';
import {
  useDebounceFn,
  useEventListener,
  useLocalStorageState,
  useSafeState,
  useUpdateEffect
} from 'ahooks';
import { Drawer } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { setMode, setNavShow } from '@/redux/actions';
import { storeState } from '@/redux/interface';
import { modeMap, modeMapArr } from '@/utils/modeMap';

import { useLinkList } from './config';
import s from './index.scss';

interface Props {
  navShow?: boolean;
  setNavShow?: Function;
  mode?: number;
  setMode?: Function;
}

const bodyStyle = window.document.getElementsByTagName('body')[0].style;

const Nav: React.FC<Props> = ({ navShow, setNavShow, mode, setMode }) => {
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [_, setLocalMode] = useLocalStorageState('localMode');
  const { navArr, secondNavArr, mobileNavArr } = useLinkList();
  const [visible, setVisible] = useSafeState(false);

  const modeOptions = ['rgb(19, 38, 36)', 'rgb(110, 180, 214)', 'rgb(171, 194, 208)'];

  // When you scroll, the "wheel" event fires rapidly, sometimes hundreds of times per second. 
  // Causes unnecessary re-renders (hurting performance).
  const { run: debouncedEventHandler } = useDebounceFn(
    (deltaY: number) => {
      setNavShow!(deltaY < 0);
    },
    { wait: 100 }
  );

  useEventListener(
    "wheel",
    (event) => {
      debouncedEventHandler(event.deltaY);
    },
    { target: document.body }
  );

  useUpdateEffect(() => {
    setLocalMode(mode);
    for (const type of modeMapArr) {
      bodyStyle.setProperty(type, modeMap[type as keyof typeof modeMap][mode!]);
    }
  }, [mode]);

  return (
    <>
      <nav className={classNames(s.nav, { [s.hiddenNav]: !navShow })}>
        <div className={s.navContent}>
          {/* Home */}
          <div className={s.homeBtn} onClick={() => navigate('/')}>
            <HomeOutlined />
          </div>

          {/* manage page */}
          <a className={s.adminBtn} onClick={() => navigate('/setting')} target='_blank' rel='noreferrer'>
            <SettingOutlined />
          </a>

          {/* dark mode switch */}
          <div className={s.modeBtn}>
            <BgColorsOutlined />
            <div className={s.modeOpions}>
              {modeOptions.map((backgroundColor, index) => (
                <div
                  key={index}
                  style={{ backgroundColor }}
                  className={classNames(s.modeItem, s[`modeItem${index}`])}
                  onClick={() => setMode?.(index)}
                >
                  <CheckOutlined style={{ display: mode === index ? 'block' : 'none' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Articles buttons */}
          <div className={s.articlesBtn}>
            <div className={s.articelsSecond}>
              {secondNavArr.map((item, index) => (
                <NavLink

                  className={({ isActive }) =>
                    isActive ? s.sedActive : s.articelsSecondItem
                  }
                  to={item.to}
                  key={index}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            Articles
          </div>

          {/* other buttons */}
          {navArr.map((item, index) => (
            <NavLink
              className={({ isActive }) => (isActive ? s.navActive : s.navBtn)}
              to={item.to}
              key={index}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
      <div className={s.mobileNavBtn} onClick={() => setVisible(true)}>
        <MenuOutlined />
      </div>
      <Drawer
        placement='right'
        onClose={() => setVisible(false)}
        visible={visible}
        className='mobile-nav-box'
      >
        <div className={s.mobileNavBox}>
          {mobileNavArr.map((item, index) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? s.mobileNavActive : s.mobileNavItem
              }
              to={item.to}
              key={index}
            >
              {item.name}
            </NavLink>
          ))}
          {modeOptions.map((backgroundColor, index) => (
            <div
              key={index}
              style={{ backgroundColor }}
              className={classNames(s.modeItem, s[`modeItem${index}`])}
              onClick={() => setMode?.(index)}
            >
              {mode === index && <CheckOutlined />}
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default connect(
  (state: storeState) => ({
    navShow: state.navShow,
    mode: state.mode
  }),
  { setNavShow, setMode }
)(Nav);
