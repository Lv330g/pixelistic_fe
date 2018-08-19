import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authValidate, authSignOut } from './../../actions/auth';
import { cleanFollowings, changeConnectionStatus } from '../../actions/followings';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import io from "socket.io-client";
import { port, host } from "../../const/node-server-config";

import Header from '../../shared/components/header/Header';
import LoadingSpinner from '../../shared/components/loading-spinner/LoadingSpinner';

export class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accessToken: null,
      user: null
    }

    this.socket.on('connection changed', (data) => {
      const userId = this.props.user._id;
      const follower = data.followers.some(item => item === userId);
      if (follower) this.props.changeConnectionStatus(data);
    });
  }

  componentWillMount() {
    let accessToken = window.localStorage.getItem('authHeaders')  ? 
      JSON.parse(window.localStorage.getItem('authHeaders'))['accessToken'] : null;
    this.setState({ accessToken });

    window.addEventListener('unload', () => this.emitConnectingChange('offline'));
  }

  componentDidUpdate() {
    const user = this.props.user;
    console.log('did upt')
    console.log(user)
    if (user) {
      this.emitConnectingChange('online');
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;
    if(this.state.accessToken && !this.props.isAuthorized){
      this.props.authValidate();
    }

    if ( (!this.state.accessToken && !this.props.isAuthorized) || this.props.errorMessage === 'session timeout' ) {
      return <Redirect to='/sign-in'/>;
    } 

    if (this.state.accessToken && this.props.isAuthorized) {
      return <Route {...rest} render={matchProps => (
        <div className="main-layout">
          <Header onSignOut={this.signOut}/>
          <div className="content">
            <Component {...matchProps} user={this.props.user} />
          </div>
        </div>
      )} />
    }

    return <LoadingSpinner/>
  }

  socket = io.connect(`${host}:${port}`);
  
  signOut = () => {
    this.emitConnectingChange('offline');
    this.socket.disconnect();
    this.props.authSignOut();
    this.props.cleanFollowings();
    this.setState({ accessToken: false });
  }

  emitConnectingChange = (status) => {
    this.socket.emit(
      'change connection status', 
      {status, followers: this.props.user.followers, userId: this.props.user._id}
    );
  }
};

export default connect(
  state => ({
    user: state.auth.user,
    error: state.auth.error,
    errorMessage: state.auth.errorMessage,
    isAuthorized: state.auth.isAuthorized,
  }),
  dispatch => ({
    authValidate: (email, password) => dispatch(authValidate(email, password)),
    authSignOut: () => dispatch(authSignOut()),
    cleanFollowings: () => dispatch(cleanFollowings()),
    changeConnectionStatus: data => dispatch(changeConnectionStatus(data))
  })
)(MainLayout);

