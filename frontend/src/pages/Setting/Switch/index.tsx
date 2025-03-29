import classNames from 'classnames';
import React from 'react';

import s from './index.scss';

interface Props {
  state: boolean;
  toggle: Function;
  setLeft: Function;
  setRight: Function;
}

const Switch: React.FC<Props> = ({ state, toggle, setLeft, setRight }) => {
  return (
    <div className={s.switch}>
      <div
        className={classNames(s.publish, { [s.titleOff]: state })}
        onClick={() => setLeft()}
      >
        PUBLISH
      </div>
      <div className={s.box} onClick={() => toggle()}>
        <div className={classNames(s.btn, { [s.isMe]: state })} />
      </div>
      <div
        className={classNames(s.manage, { [s.titleOff]: !state })}
        onClick={() => setRight()}
      >
        MANAGE
      </div>
    </div>
  );
};

export default Switch;
