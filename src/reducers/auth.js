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
            error: false,
            errorMessage: null,
            user: action.payload,
            confMsg: null,
            isAuthorized: true
        };
        case 'VERIFY_SUCCESS':
        return {
            error: false,
            errorMessage: null,
            user: action.payload,
            confMsg: null,
            isAuthorized: false
        };
        
        case 'EMAIL_SENDED':
        return {
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

        case 'SIGN_IN_ERROR':
        case 'REGISTER_ERROR':
        return {
            error: true,
            errorMessage: action.payload.response.data.error,
            user: null,
            confMsg: null,
            isAuthorized: false
        };
        case 'SIGN_OUT':
        return {
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
