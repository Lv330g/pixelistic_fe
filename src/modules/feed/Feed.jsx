import React, {Component} from 'react';

import FeedLine from '../feed-line/FeedLine';
import Header from '../../shared/components/header/Header'

import { Grid } from '@material-ui/core';

import { connect } from 'react-redux';
import { authValidate } from './../../actions/auth'
import { Redirect } from 'react-router';


class Feed extends Component {
  constructor(props){
    super(props)
    this.state = {
      accessToken:false
    }
  }

  componentWillMount(){
    let accessToken = window.localStorage.getItem('authHeaders')  ? 
      JSON.parse(window.localStorage.getItem('authHeaders'))['accessToken'] : null;
    
    this.setState({ accessToken });
    
    if(!this.props.user) this.props.authValidate();
  }

  render(){

    if (!this.state.accessToken && !this.props.isAuthorized) {
      return <Redirect to='/sign-in'/>;
    }

    return (
      <Grid container direction={"column"} alignItems={"flex-start"} item xs={12}>
        <Header/>
      <FeedLine />
      </Grid>
    )
  }
  
};

export default connect(
  state => ({
    user: state.auth.user,
    errMsg: state.auth.errorMessage
  }),
  dispatch => ({
    authValidate: (email, password) => dispatch(authValidate(email, password))
    }
  )
)(Feed)

