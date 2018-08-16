import { combineReducers } from 'redux'
import auth from './auth';
import profile from './userprofile'
import post from './post';

export default combineReducers({
    auth,
    profile,
    post
});
