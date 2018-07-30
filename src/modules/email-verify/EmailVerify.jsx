import React from 'react';
import { connect } from 'react-redux';
import { authVerifyEmail } from './../../actions/auth';
import { Redirect } from 'react-router';

import { CircularProgress }  from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';


const EmailVerify = (props) => {
    props.authVerifyEmail(window.location.search);
    if(props.user){
      return <Redirect to='/'/>;
    }
    else{
      return (
        <div className="verify-page">
          <p className={props.error ? 'error':''}>{props.errMsg || 'Redirecting ...'}</p>

          {props.error ?  (<ErrorOutline className="err-icon"/>) 
          : <CircularProgress className="spinner" size={50}/>}
        </div>
      )
    }
}

export default connect(
  state => ({
    user: state.auth.user,
    errMsg: state.auth.errorMessage,
    error: state.auth.error
  }),
  dispatch => ({
    authVerifyEmail: (hash) => dispatch(authVerifyEmail(hash))
  })
)(EmailVerify)
