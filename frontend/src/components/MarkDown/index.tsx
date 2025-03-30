import './hljs.custom.scss';

import classNames from 'classnames';
import hljs from 'highlight.js';
import marked from 'marked';
import React from 'react';

import s from './index.scss';

interface Props {
  content?: string;
  className?: string;
}

hljs.configure({
  classPrefix: 'hljs-',
  languages: ['CSS', 'HTML', 'JavaScript', 'TypeScript', 'Markdown']
});
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: code => hljs.highlightAuto(code).value,
  gfm: true, // The default is true. Allows Git Hub standard markdown.
  breaks: true // The default is false. Allow carriage return and line feed. This option requires gfm to be true.
});

const MarkDown: React.FC<Props> = ({ content, className }) => {
  return (
    <div
      className={classNames(s.marked, className)}
      dangerouslySetInnerHTML={{
        __html: marked(content || '').replace(/<pre>/g, "<pre id='hljs'>")
      }}
    />
  );
};

export default MarkDown;
