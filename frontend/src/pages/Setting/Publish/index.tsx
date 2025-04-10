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
import MarkDown from '@/components/MarkDown';
import { useScrollSync } from '@/utils/hooks/useScrollSync';
import { createArticle } from '@/utils/apis/getArticles';

interface Props {
  className?: string;
}

const Publish: React.FC<Props> = ({ className }) => {

  const { leftRef, rightRef, handleScrollRun } = useScrollSync();

  const [content, setContent] = useSafeState('');
  const [title, setTitle] = useSafeState('');
  const [tags, setTags] = useSafeState<number[]>([])

  const { data, loading } = useRequest(getTagList, {
    retryCount: 3,
    staleTime
  });

  const options: SelectProps['options'] = [];

  data?.data?.tags.forEach((item: { id: string; name: string }) => {
    options.push({ label: item.name, value: item.id });
  })

  const publishHandle = () => {
    createArticle({ title: title, content: content, tags: tags, cover: "0", draft: false })
      .then(res => {
        message.success("Article published successfully!");
        // Reset fields after successful publish
        setTitle('');
        setContent('');
        setTags([]);
      })
      .catch(err => {
        message.error("Failed to publish article: " + err.message);
      });
  }

  const saveDraftHandle = () => {
    createArticle({ title: title, content: content, tags: tags, cover: 0, draft: true })
  }

  return (
    <div className={classNames(s.editBox, className)}>
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
                onChange={value => setTags(value)}
                style={{ width: '100%' }}
                options={options}
                className={s.inputValue}
              />
            </div>
          </div>

          <div className={classNames(s.contentEdit, s.textareaBox)}>
            <textarea
              ref={leftRef}
              className={classNames(s.markedEdit, s.input, s.textarea)}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder='content, todo: markdown preview'
              onScroll={handleScrollRun}
            />
            {/* <MarkDown
              ref={rightRef}
              className={s.markedEdit}
              content={content}
              onScroll={handleScrollRun}
            /> */}
          </div>

          <div className={s.commentBtns}>
            <div className={s.publishBtn} onClick={publishHandle}>
              publish
            </div>
            <div className={s.saveBtn} onClick={saveDraftHandle}>
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

export default connect()(Publish);
