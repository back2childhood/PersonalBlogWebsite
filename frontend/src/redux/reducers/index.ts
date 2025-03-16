import { combineReducers } from 'redux';

import mode from './mode';
import navShow from './navShow';

export default combineReducers({
    mode,
    navShow
});