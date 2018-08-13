import React, {Component} from 'react';
import { connect } from 'react-redux';
import { authValidate, authSignOut } from './../../actions/auth'
import { Redirect } from 'react-router';

import FeedLine from '../feed-line/FeedLine';
import Header from '../../shared/components/header/Header';
import FeedAside from '../feed-aside/FeedAside';
import UpstairsBtn from '../../shared/components/upstairs-btn/UpstairsBtn';
import LoadingSpinner from '../../shared/components/loading-spinner/LoadingSpinner';

export class Feed extends Component {
  constructor(props){
    super(props)
    this.state = {
      accessToken: false
    }

    this.FeedRef = React.createRef();
  }

  componentWillMount(){
    let accessToken = window.localStorage.getItem('authHeaders')  ? 
      JSON.parse(window.localStorage.getItem('authHeaders'))['accessToken'] : null;

      this.setState({ accessToken });
  }

  render(){

    if(this.state.accessToken && !this.props.isAuthorized){
      this.props.authValidate();
    }

    if (!this.state.accessToken && !this.props.isAuthorized) {
      return <Redirect to='/sign-in'/>;
    } 

    if (this.state.accessToken && this.props.isAuthorized) {
      return <div 
        className="feed" 
        ref={this.FeedRef}
      > 
        <Header onSignOut = {this.signOut}/>
        <FeedLine 
          nickname={this.props.user.nickname} 
        />
        <FeedAside 
          nickname={this.props.user.nickname}
        />
        <UpstairsBtn />
      </div>
    }

    return <LoadingSpinner/>    
  }
  
  signOut = () => {
    this.props.authSignOut();
    this.setState({ accessToken: false });
  }
}

export default connect(
  state => ({
    user: state.auth.user,
    isAuthorized: state.auth.isAuthorized,
  }),
  dispatch => ({
    authValidate: (email, password) => dispatch(authValidate(email, password)),
    authSignOut: () => dispatch(authSignOut())
  })
)(Feed)

