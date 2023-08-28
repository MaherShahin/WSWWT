import { combineReducers } from 'redux';
import seriesReducer from './series/seriesReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
    series: seriesReducer,
    user: userReducer
});

export default rootReducer;
