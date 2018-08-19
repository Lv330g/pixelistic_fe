const initialState = {
  error: false,
  errorMessage: null,
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
      case 'FOLLOW_SUCCESS':
      return {
        ...state,
        error: false,
        errorMessage: null,
        users: (() => state.users.map(item => {
            if (item._id === action.payload.followingId) {
              item.favorite = false;
              item.following = true;
              item.followingId = action.payload.followingId;
              item.followingInfoId = action.payload.followingInfoId;
              item.newMessages = action.payload.newMessages;
              item.status = action.payload.status;
            }
            return item;
        }))(),
      };

      case 'UNFOLLOW_SUCCESS':
      return {
        ...state,
        error: false,
        errorMessage: null,
        users: (() => state.users.map(item => {
          if (item.followingId === action.payload) {
            item.following = false;
          }
          return item;
        }))()
      };

      case 'GET_PROFILE_ERROR':
      case 'HANDLE_FAVORITE_ERROR':
      case 'FOLLOW_ERROR':
      case 'UNFOLLOW_ERROR':
      return {
        ...state,
        error: true,
        errorMessage: action.payload.response.data.error,
        users: [...state.users],
      };

      case 'HANDLE_FAVORITE_SUCCESS':
      return {
        ...state,
        error: false,
        errorMessage: null,
        users: (() => state.users.map(item => {
          if (item.followingInfoId === action.payload.followingInfoId) {
            item.favorite = action.payload.checked;
          }
          return item;
        }))(),
      };

      case 'LOAD_CURRENT_FOLLOWINGS':
      return {
        ...state,
        users: (() => {
          return action.payload.followingsInfo.map((item, i) => {
            item.status = action.payload.followings[i].status;
            item.avatar = action.payload.followings[i].avatar;
            item.nickname = action.payload.followings[i].nickname;
            item.fullName = action.payload.followings[i].userName;
            item.website = action.payload.followings[i].website;
            item.bio = action.payload.followings[i].userBio;
            item.posts = action.payload.followings[i].posts;
            item.followingInfoId = item._id;
            item.following = true;
            return item;
          });
        })()
      };

      case 'CLEAN_FOLLOWINGS':
      return initialState;

      case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        error: false,
        errorMessage: null,
        users: [...state.users, action.payload],
      };

      case 'STATUS_CONNECTION_CHANGE':
      return {
        ...state,
        error: false,
        errorMessage: null,
        users: (() => state.users.map(item => {
          if (item.followingId === action.payload.userId) {
            item.status = action.payload.status;
          }
          return item;
        }))()
      }

      default:
      return state;
  }
}
