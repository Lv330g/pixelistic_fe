import { combineReducers } from 'redux'
import auth from './auth';
import post from './post';
import followings from './followings';

export default combineReducers({
    auth,
    post,
    followings
});
