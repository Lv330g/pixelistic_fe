import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import PassportBtn from '../passport-btn/PassportBtn';

export default class FbAuth extends Component {
  render() {
    return <FacebookLogin
      appId="2074597306122897"
      callback={this.responseFacebook}
      fields="name,email,picture"
      render={renderProps => <PassportBtn onClick={renderProps.onClick} name="facebook" />}
    />
  }

  responseFacebook = res => {
    this.props.handleFb(res);
  }
}
