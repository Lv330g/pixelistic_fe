import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import PassportBtn from '../passport-btn/PassportBtn';

export default class GoogleAuth extends Component {
  render() {
    return <GoogleLogin
      clientId="717152176938-vu6ravml2e21irkb1cfs7ld6op75grr7.apps.googleusercontent.com"
      onSuccess={this.responseGoogle}
      render={(props) => <PassportBtn onClick={props.onClick} name="google" />}
    />
  }

  responseGoogle = (res) => {
    this.props.handleGoogle(res.profileObj);
  }
}
