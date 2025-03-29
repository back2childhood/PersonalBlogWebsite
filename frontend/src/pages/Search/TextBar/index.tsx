import { ArrowRightOutlined, RedoOutlined } from '@ant-design/icons';
import { useKeyPress, useSafeState } from 'ahooks';
import { message } from 'antd';
import React, { useRef } from 'react';


import s from './index.scss';
import { defaultPageSize } from '@/utils/constant';

interface Props {
  page: number;
  setPage: Function;
  where: String;
  setWhere: Function;
  run: Function;
}

const TextBar: React.FC<Props> = ({ page, setPage, where, setWhere, run }) => {
  const [input, setInput] = useSafeState('');
  const inputRef = useRef(null);

  const search = () => {
    if (!input) {
      message.info('Search bar is empty ;(');
      return;
    }
    setTimeout(() => {
      setWhere(input);
      setPage(1);
      run?.({ keyword: input, page: page, pagesize: defaultPageSize });
    }, 0);
  };

  const reset = () => {
    if (where === '' && page === 1 && !input) {
      return;
    }
    if (where === '' && page === 1) {
      setInput('');
      message.info('refresh!');
      return;
    }
    setTimeout(() => {
      setInput?.('');
      setWhere('');
      setPage(1);
      run?.();
    }, 0);
  };

  useKeyPress(13, search, {
    target: inputRef
  });

  useKeyPress(27, reset, {
    target: inputRef
  });

  return (
    <div className={s.searchBox}>
      <input
        ref={inputRef}
        autoFocus
        type='text'
        placeholder='Search Articles Title or Content :)'
        className={s.search}
        value={input}
        onChange={e => setInput?.(e.target.value)}
      />
      {/* search button */}
      <div className={s.searchBtn} onClick={search}>
        <ArrowRightOutlined />
      </div>
      {/* reset button */}
      <div className={s.searchBtn} onClick={reset}>
        <RedoOutlined />
      </div>
    </div>
  );
};

export default TextBar;
