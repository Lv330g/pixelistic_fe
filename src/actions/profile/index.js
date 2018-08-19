import { profileAPI } from '../../api/profile-api';

 export const getProfileForEdit = (nickname, fillStateCallback) => {
    return dispatch => {
        return profileAPI.getProfile(nickname).then(userprofile => {
            fillStateCallback(userprofile);
            dispatch({ type: 'USER_PROFILE_EDIT', payload: userprofile });
        }, err => {    
            dispatch({ type: 'USER_PROFILE_ERROR', payload: err })
        });
    }
};

export const getProfile = (nickname) => {
    return dispatch => {
        return profileAPI.getProfile(nickname).then(payload => {
            dispatch({ type: 'GET_PROFILE_SUCCESS', payload});
        }, err => {    
            dispatch({ type: 'GET_PROFILE_ERROR', payload: err })
        });
    }
};

export const updateProfile = (nickname, userName, newNickname, website, userBio) => {
    return dispatch => {
        return profileAPI.updateProfile(nickname, userName, newNickname, website, userBio).then(userprofile => {
            dispatch({ type: 'USER_PROFILE_UPDATED', payload: userprofile.data.userprofile });
        }, err => {    
            dispatch({ type: 'USER_PROFILE_ERROR', payload: err })
        });
    }
};
