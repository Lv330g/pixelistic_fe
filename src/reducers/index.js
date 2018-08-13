import { combineReducers } from 'redux'
import auth from './auth';
import post from './post';
import profile from './userprofile';
import followings from './followings';

export default combineReducers({
    auth,
    profile,
    post,
    followings
});
