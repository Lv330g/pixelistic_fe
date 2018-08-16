import React, {Component} from 'react';
import { connect } from 'react-redux';
import { authValidate, authSignOut } from './../../actions/auth';

import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import Header from '../../shared/components/header/Header';
import LoadingSpinner from '../../shared/components/loading-spinner/LoadingSpinner';



export class MainLayout extends Component {
  constructor(props){
    super(props)
    this.state = {
      accessToken: null
    }
  }

  componentWillMount(){
    let accessToken = window.localStorage.getItem('authHeaders')  ? 
      JSON.parse(window.localStorage.getItem('authHeaders'))['accessToken'] : null;

    this.setState({ accessToken });
  }

  render(){
    const { component: Component, ...rest } = this.props;
    if(this.state.accessToken && !this.props.isAuthorized){
      this.props.authValidate();
    }

    if ( (!this.state.accessToken && !this.props.isAuthorized) || this.props.errorMessage === 'session timeout' ) {
      return <Redirect to='/sign-in'/>;
    } 

    if (this.state.accessToken && this.props.isAuthorized) {
      console.log(rest)
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
  
  signOut = () => {
    this.props.authSignOut();
    this.setState({ accessToken: false });
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
  })
)(MainLayout);

