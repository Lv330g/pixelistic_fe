import { combineReducers } from 'redux'
import auth from './auth';
import post from './post';
import followings from './followings';

import dashboard from './admin-dashboard';


export default combineReducers({
    auth,
    post,
    followings,
    dashboard
});
