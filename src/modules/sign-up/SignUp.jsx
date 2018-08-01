import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authSignUp } from './../../actions/auth'
import { Redirect } from 'react-router';


import { Grid, Typography, FormControl, Input, Button, InputLabel } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';

export class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      nickname: '',
      email: '',
      password: '',
      passwordConf: ''
    }
  }
  render () {

    if (this.props.user || window.localStorage.getItem('authToken')) {
      return <Redirect to='/'/>;
    }
    else{
      return(
        <Grid container alignItems={"center"} justify={"center"} direction={"column"}>
          <Grid className="sign-up" item xs={5} container alignItems={"center"} justify={"center"} direction={"column"}>
            <Grid className="signup-container" container justify={"center"}>
              <Grid item xs={8} container justify={"flex-start"} direction={"column"}>
                <h1>Pixel</h1>

                <p className="intro-text light-grey">
                  Sign up to see photos from your friends
                </p>

                <Button className="fb-btn" type={"button"} color={"primary"} variant={"contained"} fullWidth>
                  <svg className="fb-icon" viewBox="0 0 24 24">
                    <path fill="#fff" d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z"/>
                  </svg>
                  Log in with Facebook
                </Button>

                <p className="divider light-grey">OR</p>

                <form onSubmit={this.handeSubmit}>
                  <FormControl margin={"normal"} fullWidth>
                    <InputLabel htmlFor="inp-nickname">Nickname</InputLabel>
                    <Input id="inp-nickname" type={"text"} required onChange={this.handeInput} name="nickname" value={this.state.nickname}/>
                  </FormControl>
                  <FormControl margin={"normal"} fullWidth>
                    <InputLabel htmlFor="inp-email">Email</InputLabel>
                    <Input id="inp-email" type={"email"} required  onChange={this.handeInput} name="email" value={this.state.email}/>
                  </FormControl>
                  <FormControl margin={"normal"} fullWidth>
                    <InputLabel htmlFor="inp-password">Password</InputLabel>
                    <Input id="inp-password" type={"password"} required  onChange={this.handeInput} name="password" value={this.state.password}/>
                  </FormControl>
                  <FormControl margin={"normal"} fullWidth>
                    <InputLabel htmlFor="inp-confirm">Confirm Password</InputLabel>
                    <Input id="inp-confirm" type={"password"} required  onChange={this.handeInput} name="passwordConf" value={this.state.passwordConf}/>
                  </FormControl>

                  <p className={this.props.errMsg ? 'err-msg msg' : 'msg'}>{this.props.errMsg || this.props.confMsg}</p>

                  <Button className="submit-btn" type={"submit"} color={"primary"} variant={"contained"} fullWidth>
                    <PersonAdd className="add-icon"/>
                    Sign Up
                  </Button>

                </form>
              </Grid>
            </Grid>

            {/* Log in link */}
            <Grid className="login-container_link" item xs={12} container justify={"center"}>
              <Typography>
                Have an account?
                <Link to="/sign-in"> Log in</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid> 
      )
    }
  }
  handeInput = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  handeSubmit = (e) => {
      e.preventDefault();
      let { nickname, email, password, passwordConf } = this.state;
      this.props.authSignUp(nickname, email, password, passwordConf);
    }
}

export default connect(
  state => ({
    user: state.auth.user,
    errMsg: state.auth.errorMessage,
    confMsg: state.auth.confMsg
  }),
  dispatch => ({
    authSignUp: (nickname, email, password, passwordConf) => dispatch(authSignUp(nickname, email, password, passwordConf))
    }
  )
)(SignUp)
