const initialState = {
    error: false,
    errorMessage: null,
    userprofile: null
};
 export default function (state = initialState, action) {
    switch (action.type) {
        case 'USER_PROFILE_FOUND':
        return {
            ...state,
            error: false,
            errorMessage: null,
            userprofile: action.payload
        };
        case 'USER_PROFILE_EDIT':
        return {
            ...state,
            error: false,
            errorMessage: null,
            userprofile: action.payload
        };
        case 'USER_PROFILE_UPDATED':
        return {
            ...state,
            error: false,
            errorMessage: null,
            userprofile: action.payload
        };
        case 'USER_PROFILE_ERROR':
        return {
            ...state,
            error: true,
            errorMessage: action.payload.response.data.error,
            userprofile: null
        };
        default:
        return state
    }
}