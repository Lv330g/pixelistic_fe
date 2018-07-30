import { authApi } from '../../api/auth-api';

export const authSignIn = (email, password) => {
    return dispatch => {
        return authApi.signIn(email, password).then(user => {
            dispatch({ type: 'SIGN_IN_SUCCESS', payload: user });
        }, err => {    
            dispatch({ type: 'SIGN_IN_ERROR', payload: err })
        });
    }
}

export const authSignUp = (nickname, email, password, passwordConf) => {
    return dispatch => {
        return authApi.signUp(nickname, email, password, passwordConf).then(confMsg => {
            dispatch({ type: 'EMAIL_SENDED', payload: confMsg });
        }, err => {    
            dispatch({ type: 'REGISTER_ERROR', payload: err })
        });
    }
}

export const authSignOut = () => {
    return dispatch => {
        authApi.signOut().then(() => dispatch({ type: 'SIGN_OUT'}));
    }
}

export const authVerifyEmail = (hash) => {
    return dispatch => {
        return authApi.verifyEmail(hash).then(user => {
            dispatch({ type: 'VERIFY_SUCCESS', payload: user });
        }, err => {    
            dispatch({ type: 'VERIFY_ERROR', payload: err })
        });
    }
}
