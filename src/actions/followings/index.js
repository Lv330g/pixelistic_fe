import { followApi } from '../../api/followings-api';

export const follow = data => {
  return dispatch => {
    return followApi.follow(data).then(payload => {
      dispatch({ type: 'FOLLOW_SUCCESS', payload });
    }, err => {    
      dispatch({ type: 'FOLLOW_ERROR', payload: err })
    });
  }
};

export const handleFavorite = data => {
  return dispatch => {
    return followApi.handleFavorite(data).then(payload => {
      dispatch({ type: 'HANDLE_FAVORITE_SUCCESS', payload });
    }, err => {    
      dispatch({ type: 'HANDLE_FAVORITE_ERROR', payload: err })
    });
  }
};

export const unfollow = (data) => {
  return dispatch => {
    return followApi.unfollow(data).then(payload => {
      dispatch({ type: 'UNFOLLOW_SUCCESS', payload });
    }, err => {    
      dispatch({ type: 'UNFOLLOW_ERROR', payload: err })
    });
  }
};

export const loadCurrentFollowings = user => {
  return { type: 'LOAD_CURRENT_FOLLOWINGS', payload: user};
};

export const cleanFollowings = () => {
  return { type: 'CLEAN_FOLLOWINGS' }
};

export const changeFollowingsStatus = payload => {
  return { type: 'STATUS_CONNECTION_CHANGE', payload }
};
