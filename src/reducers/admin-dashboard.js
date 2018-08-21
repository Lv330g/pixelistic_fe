const initialState = {
  error: false,
  errorMessage: null,
  users: []
};

export default function (state = initialState, action) {
  switch (action.type) {
      case 'LOAD_USERS_SUCCESS':
      return {
        ...state,
        error: false,
        errorMessage: null,
        users: action.payload
      };
      case 'LOAD_USERS_ERROR':
      return {
        ...state,
        error: true,
        errorMessage: action.payload.response.data.error,
        users: null
      };
      case 'USER_STATUS_UPDATED':
      let updatedUsers = state.users.map( item =>{
        if(item._id === action.payload.id){
            item.isActive = action.payload.status;
        }
        return item;
      })
      return {
        ...state,
        error: false,
        errorMessage: null,
       users: updatedUsers
      };
      case 'USER_STATUS_ERROR':
      return {
        ...state,
        error: true,
        errorMessage: action.payload.data.error,
        users: null
      };

      default:
      return state
  }
}
