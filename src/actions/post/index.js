import { postApi } from '../../api/post-api';

export const postAddPost = (image, description, geolocation, user) => {
  return dispatch => {
    dispatch({type: 'START_POST_SAVING'});
    return postApi.addPost(image, description, geolocation, user).then( post => {
        dispatch({ type: 'POST_ADD_SUCCESS', payload: post });
      }, err => {    
        dispatch({ type: 'POST_ADD_ERROR', payload: err })
      });
  }
}

export const postOwnPosts = (user) => {
    return { type: 'LOAD_OWN_POSTS', payload: user.posts };
}
