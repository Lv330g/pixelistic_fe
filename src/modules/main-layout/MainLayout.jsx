import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authValidate, authSignOut } from './../../actions/auth';
import { cleanFollowings, changeConnectionStatus, loadCurrentFollowings, handleFavorite } from '../../actions/followings';
import { postClearPosts, postSessionPosts } from './../../actions/post';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import io from "socket.io-client";
import { port, host } from "../../const/node-server-config";
import Header from '../../shared/components/header/Header';
import DashboardHeader from '../admin-dashboard/components/DasnboardHeader';
import LoadingSpinner from '../../shared/components/loading-spinner/LoadingSpinner';

export class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accessToken: null,
      user: null
    }

    if(this.props.user) {
      this.socket.on('connection changed', (data) => {
        const userId = this.props.user._id;
        const follower = data.followers.some(item => item === userId);
        if (follower) this.props.changeConnectionStatus(data);
      });
    }
  }

  componentDidMount(){
    let accessToken = window.localStorage.getItem('authHeaders')  ? 
      JSON.parse(window.localStorage.getItem('authHeaders'))['accessToken'] : false;
    
    if(accessToken && !this.props.isAuthorized) {
      this.props.authValidate();
    }

    window.addEventListener('unload', () => this.emitConnectingChange('offline'));
       
    this.setState({ accessToken });
  }

  componentDidUpdate() {
    if(!this.props.currentSessionPosts.length && !this.props.wasLoadedFirstTime && this.props.user) {
      this.props.postSessionPosts(this.props.user);
      this.props.loadCurrentFollowings(this.props.user);
      const user = this.props.user;
  
      if (user) {
        this.emitConnectingChange('online');
      }
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;
   
     
    if ( (this.state.accessToken === false && !this.props.isAuthorized) || this.props.errorMessage === 'session timeout' ) {
      return <Redirect to='/sign-in'/>;
    } 
  

    if (this.state.accessToken && this.props.isAuthorized) {
      //this.loadInitialPosts();
      return <Route {...rest} render={matchProps => (
        <div className="main-layout">
          {this.props.path === '/dashboard' ? <DashboardHeader onSignOut={this.signOut}/> : <Header onSignOut={this.signOut}/>}
          <div className="content">
            <Component 
              {...matchProps} 
              user={this.props.user} 
              users={this.props.users} 
              posts={this.props.currentSessionPosts}
              handleFavorite={this.props.handleFavorite}
              loading={this.props.loading}
            />
          </div>
        </div>
      )} />
    }

    return <LoadingSpinner/>
  }

  socket = io.connect(`${host}:${port}`);

  signOut =  async () => {
    this.setState({ accessToken: false });
    this.emitConnectingChange('offline');
    this.socket.disconnect();
    await this.props.authSignOut();
    this.props.postClearPosts();
    this.props.cleanFollowings();
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
    currentSessionPosts: state.post.currentSessionPosts,
    wasLoadedFirstTime: state.post.wasLoadedFirstTime,
    users: state.followings.users,
    loading:  state.followings.loading
  }),
  dispatch => ({
    authValidate: (email, password) => dispatch(authValidate(email, password)),
    authSignOut: () => dispatch(authSignOut()),
    cleanFollowings: () => dispatch(cleanFollowings()),
    changeConnectionStatus: data => dispatch(changeConnectionStatus(data)),
    postClearPosts: () => dispatch(postClearPosts()),
    postSessionPosts: (user) => dispatch(postSessionPosts(user)),
    loadCurrentFollowings: (user) => dispatch(loadCurrentFollowings(user)),
    handleFavorite: (data) => dispatch(handleFavorite(data))
  })
)(MainLayout);

