const initialState = {
  error: false,
  errorMessage: null,
  users: [],
  loading: false,
};

const updateUserProps = (oldUser, newUser) => {
  oldUser.bio = newUser.bio;
  oldUser.website = newUser.website;
  oldUser.fullName = newUser.fullName;
  oldUser.avatar = newUser.avatar;
  oldUser.nickname = newUser.nickname;
}

const editUser = (users, payload) => {

  return users.map( item => {
    if (item._id === payload._id) {
      updateUserProps(item, payload)
    }
    return item;
  });
};

const editOrAdd = (users, payload) => {
  let isOldUser = false;
  let newUsers = users.map( item => {
    if (item._id === payload._id) {
      updateUserProps(item, payload)
      isOldUser = true
    }
    return item;
  });
  if (isOldUser) {
    return newUsers
  } else {
    return [...users, payload]
  }
}

export default function (state = initialState, action) {
  switch (action.type) {

      case 'LOADING':{
        return{
          ...state,
          loading: true
        }
      }

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
        users:(() => {
          const { payload } = action;
          if (payload) {
            return payload.followingsInfo.map((item, i) => {
              const { followings } = payload;
              item.status = followings[i].status;
              item.avatar = followings[i].avatar;
              item.nickname = followings[i].nickname;
              item.fullName = followings[i].userName;
              item.website = followings[i].website;
              item.bio = followings[i].userBio;
              item.posts = followings[i].posts;
              item.followingInfoId = item._id;
              item._id = followings[i]._id;
              item.following = true;
              return item;
            });
          }
          return state.users;
        })()
      };

      case 'CLEAN_FOLLOWINGS':
      return initialState;

      case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        error: false,
        errorMessage: null,
        users: editOrAdd(state.users, action.payload),
        loading: false
      };

      case 'PROFILE_UPDATED_SUCCESS':
      return {
        error: false,
        errorMessage: null,
        users: editUser(state.users, action.payload),
        loading: false
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
