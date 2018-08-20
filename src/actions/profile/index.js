import { profileAPI } from '../../api/profile-api';

export const getProfile = (nickname) => {
    return dispatch => {
      dispatch({type:'LOADING'});
        return profileAPI.getProfile(nickname).then(payload => {
            dispatch({ type: 'GET_PROFILE_SUCCESS', payload: payload});
        }, err => {    
            dispatch({ type: 'GET_PROFILE_ERROR', payload: err })
        });
    }
};

export const updateProfile = (_id, fullName, newNickname, website, bio, avatar, updateStateCallback, onErrorCallback) => {
    return dispatch => {
        return profileAPI.updateProfile(_id, fullName, newNickname, website, bio, avatar).then(userprofile => {
            updateStateCallback();
            dispatch({ type: 'PROFILE_UPDATED_SUCCESS', payload: userprofile });
        }, err => {    
            dispatch({ type: 'GET_PROFILE_ERROR', payload: err })
            if (typeof onErrorCallback === 'function') {
                onErrorCallback();
            }
        });
    }
};
