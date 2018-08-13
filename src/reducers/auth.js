const initialState = {
    error: false,
    errorMessage: null,
    user: null,
    confMsg: null,
    isAuthorized: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SIGN_IN_SUCCESS':
        return {
            ...state,
            error: false,
            errorMessage: null,
            user: action.payload,
            confMsg: null,
            isAuthorized: true
        };

        case 'VERIFY_SUCCESS':
        return {
            ...state,
            error: false,
            errorMessage: null,
            user: action.payload,
            confMsg: null,
            isAuthorized: false
        };
        
        case 'EMAIL_SENDED':
        return {
            ...state,
            error: false,
            errorMessage: null,
            user: null,
            confMsg: action.payload,
            isAuthorized: false
        };

        case 'VERIFY_ERROR':
        return {
            ...state,
            error: true,
            errorMessage: null,
            user: action.payload,
            confMsg: null,
        };

        case 'EMAIL_EXIST':
        return{
            error: false,
            errorMessage: null,
            user: null,
            confMsg: action.payload,
            isAuthorized: false
        };

        case 'RESET_TOKEN_CORRECT':
        return{
            error: false,
            errorMessage: null,
            user: null,
            confMsg: action.payload,
            isAuthorized: false
        };

        case 'PASSWORD_CHANGE_SUCCESS':
        return{
            error: false,
            errorMessage: null,
            user: null,
            confMsg: action.payload,
            isAuthorized: false
        };

        case 'SIGN_IN_ERROR':
        case 'REGISTER_ERROR':
        case 'EMAIL_DOESNOT_EXIST':
        case 'RESET_TOKEN_INCORRECT':
        case 'PASSWORD_DONT_CHANGE':
        return {
            ...state,
            error: true,
            errorMessage: action.payload.response.data.error,
            user: null,
            confMsg: null,
            isAuthorized: false
        };

        case 'VALIDATE_ERROR':
        return {
          ...state,
          error: true,
          errorMessage: 'session timeout',
          user: null,
          confMsg: null,
          isAuthorized: false
        };

        case 'SIGN_OUT':
        return {
            ...state,
            error: false,
            errorMessage:null,
            user: null,
            confMsg: null,
            isAuthorized: false
        };
        default:
        return state
    }
}
