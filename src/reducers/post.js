const initialState = {
  error: false,
  errorMessage: '',
  successMessage: '' ,
  currentSessionPosts: [],
  ownPosts: [],
  wasLoadedFirstTime: false,
  isSaving: false
  
};

const getFeedLinePosts = (followings) => {
  let feedLinePosts = [];
  followings.map(item => {
    const arr = item.posts.map( item => {
      item.type = 'feed';
      return item;
    });

    feedLinePosts = [...feedLinePosts, ...arr];
    return 'good bye';
  });


  feedLinePosts = feedLinePosts.sort((a, b) => b.timestamp - a.timestamp);


  return feedLinePosts;
  
}


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
          currentSessionPosts: [ action.payload, ...state.currentSessionPosts ],
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
     
      case 'CREATE_SESSION_POSTS':
      return {
        ...state,
        wasLoadedFirstTime: true,
        currentSessionPosts: [ ...action.payload.posts.reverse(), ...getFeedLinePosts(action.payload.followings) ]
      }

      case 'LIKES_CHANGED_SUCCESS':
      const indexLikes = state.currentSessionPosts.findIndex( (item) => item._id === action.payload._id);
      let newLikedPosts  = [ ...state.currentSessionPosts ];
      newLikedPosts[indexLikes].likes =  action.payload.likes;
      return {
        ...state,
        error: false,
        errorMessage: false,
        currentSessionPosts: newLikedPosts
      }

      case 'COMMENT_ADDED_SUCCESS':
      const indexComments = state.currentSessionPosts.findIndex( (item) => item._id === action.payload._id);
      let newCommentedPosts  = [ ...state.currentSessionPosts ];
      newCommentedPosts[indexComments].comments =  action.payload.comments;
      return {
        ...state,
        error: false,
        errorMessage: false,
        currentSessionPosts: newCommentedPosts
      }
      case 'ADD_POST_TO_SESSION':
      let postsToAdd = action.payload.filter( (item)=> {
        return state.currentSessionPosts.findIndex(el => el._id === item._id) < 0;
      })
      return {
        ...state,
        error: false,
        errorMessage:false,
        currentSessionPosts: [...state.currentSessionPosts, ...postsToAdd]
        
      }

      case 'CLEAR_ALL_POSTS':
        return initialState;
    
      default: return state;
  }
}
