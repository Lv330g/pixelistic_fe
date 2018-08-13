import { combineReducers } from 'redux'
import auth from './auth';
import profile from './userprofile'

export default combineReducers({
    auth,
    profile,
});
