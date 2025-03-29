import useUrlState from '@ahooksjs/use-url-state';
import { UserOutlined } from '@ant-design/icons';
import {
  useBoolean,
  useKeyPress,
  useLocalStorageState,
  useMount,
  useRequest,
  useSafeState
} from 'ahooks';
import { message, Select, SelectProps } from 'antd';
import classNames from 'classnames';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import sanitizeHtml from 'sanitize-html';

import s from "./index.scss"

import { storeState } from '@/redux/interface';
import { getTagList } from '@/utils/apis/getTags';
import { staleTime } from '@/utils/constant';

const EditBox: React.FC = () => {

  const [content, setContent] = useSafeState('');
  const [title, setTitle] = useSafeState('');
  // const [options, setOptions] = useSafeState();

  const { data, loading } = useRequest(getTagList, {
    retryCount: 3,
    staleTime
  });

  const options: SelectProps['options'] = [];

  data?.data?.tags.forEach((item: { id: string; name: string }) => {
    // 这里可以根据需要处理数据，例如添加到 options 数组中
    options.push({ label: item.name, value: item.id });
  })

  const publishHandle = () => {

  }

  const saveDraftHandle = () => {

  }

  return (
    <div className={classNames(s.editBox)}>
      <div className={s.flex}>

        <div className={s.editInputBox}>
          <div className={s.inputBox}>
            <div className={classNames(s.inputInfo, s.flex3)}>
              <div className={s.inputKey}>title</div>
              <input
                type='text'
                className={s.inputValue}
                placeholder='title'
                onChange={e => setTitle?.(e.target.value)}
              />
            </div>
          </div>

          <div className={s.inputBox}>
            <div className={classNames(s.inputInfo, s.flex3)}>
              <div className={s.inputKey}>tags</div>
              <Select
                mode="multiple"
                size={'middle'}
                placeholder="Please select"
                // defaultValue={['a10', 'c12']}
                // onChange={handleChange}
                style={{ width: '100%' }}
                options={options}
                className={s.inputValue}
              />
            </div>
          </div>

          <div className={s.textareaBox}>
            <textarea
              className={s.textarea}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder='content'
            />
          </div>

          <div className={s.commentBtns}>
            <div className={s.previewBtn} onClick={publishHandle}>
              publish
            </div>
            <div className={s.sendBtn} onClick={saveDraftHandle}>
              save as draft
            </div>
          </div>

          {/* <PreShow
            closePre={closePre}
            content={text}
            className={classNames({ [s.preShowHidden]: !showPre })}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default connect()(EditBox);
