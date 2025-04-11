import { combineReducers } from 'redux';

import mode from './mode';
import navShow from './navShow';
import artSum from './artSum';

export default combineReducers({
    mode,
    navShow,
    artSum
});