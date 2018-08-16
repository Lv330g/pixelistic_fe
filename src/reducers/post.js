const initialState = {
  error: false,
  errorMessage: '',
  successMessage: '' ,
  ownPosts: [],
  feedPosts: [],
  isSaving: false
  
};

export default function (state = initialState, action) {
  switch (action.type) {
      case 'START_POST_SAVING':
      return {
        ...state,
        error: false,
        isSaving: true
    };
      case 'POST_ADD_SUCCESS':
      return {
          ...state,
          error: false,
          errorMessage: '',
          successMessage: 'Post added',
          ownPosts: [ action.payload, ...state.ownPosts ],
          isSaving: false
      };
      case 'POST_ADD_ERROR':
      return {
          ...state,
          error: true,
          errorMessage: action.payload.response.data.error,
          successMessage: '',
          isSaving: false
      };
      case 'LOAD_OWN_POSTS':
      return {
          ...state,
          ownPosts: action.payload.reverse()
      }
      default: return state;
  }
}
