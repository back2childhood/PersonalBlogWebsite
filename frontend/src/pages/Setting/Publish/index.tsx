import React from 'react';
import EditBox from './EditBox';

interface Props {
  className?: string;
}

const Publish: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <EditBox />
    </div>
  );
};

export default Publish;
