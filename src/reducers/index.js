import { combineReducers } from 'redux'
import auth from './auth';
import post from './post';
import users from './users';
import dashboard from './admin-dashboard';


export default combineReducers({
    auth,
    post,
    dashboard,
    users
});
