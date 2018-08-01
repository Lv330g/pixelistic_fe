const initialState = {
    error: false,
    errorMessage: null,
    user: null,
    confMsg: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SIGN_IN_SUCCESS':
        case 'VERIFY_SUCCESS':
        return {
            error: false,
            errorMessage: null,
            user: action.payload,
            confMsg: null
        };
        case 'EMAIL_SENDED':
        return {
            error: false,
            errorMessage: null,
            user: null,
            confMsg: action.payload
        };

        case 'SIGN_IN_ERROR':
        case 'REGISTER_ERROR':
        case 'VERIFY_ERROR':
        return {
            error: true,
            errorMessage: action.payload.response.data.error,
            user: null,
            confMsg: null
        };
        case 'SIGN_OUT':
        return {
            error: false,
            errorMessage:null,
            user: null,
            confMsg: null
        };
        default:
        return state
    }
}
