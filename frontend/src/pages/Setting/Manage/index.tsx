
import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import s from "./index.scss"

interface Props {
    className?: string;
}

const Manage: React.FC<Props> = ({ className }) => {

    return (
        <div className={className}>
            manage tags / drafts / articles
        </div>
    );
};

export default Manage;
