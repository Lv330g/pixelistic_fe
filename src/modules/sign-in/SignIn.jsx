import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { Grid, Typography, FormControl, Input, Button, InputLabel } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { connect } from 'react-redux';
import { authSignIn } from './../../actions/auth';
import { Redirect } from 'react-router';

export class SignIn extends Component {
  constructor (props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    if (this.props.user || window.localStorage.getItem('authToken')) {
      return <Redirect to='/'/>;
    }
    else{
      return(
        <Grid container alignItems={"center"} justify={"center"} direction={"column"}>
          <Grid className="sign-in" item xs={5} container alignItems={"center"} justify={"center"} direction={"column"}>
            <Grid className="signin-container" container justify={"center"}>
              <Grid item xs={8} container alignItems={"center"} justify={"flex-start"} direction={"column"}>
                <h1>Pixel</h1>

                <form onSubmit={this.handleSubmit}> 
                  <FormControl margin={"normal"} fullWidth>
                    <InputLabel htmlFor="inp-email">Email</InputLabel>
                    <Input id="inp-email" autoFocus type={"email"} required name="email" onChange={this.handeInput}/>
                  </FormControl>
                  <FormControl margin={"normal"} fullWidth>
                    <InputLabel htmlFor="inp-password">Password</InputLabel>
                    <Input id="inp-password" type={"password"} required name="password" onChange={this.handeInput}/>
                  </FormControl>

                  <p className="err-msg">{this.props.errMsg}</p>

                  <Button className="submit-btn" type={"submit"} color={"primary"} variant={"contained"} fullWidth>
                    <AccountCircle className="signin-icon" />
                    Log In
                  </Button>
                </form>

                <p>
                  <Link className="reset_link" to="">Forgot password?</Link>
                </p>
              </Grid>
            </Grid>

            {/* Sign up link */}
            <Grid className="signup-container_link" item xs={12} container justify={"center"}>
              <Typography>
                Don't have an account?
                <Link to="/sign-up"> Sign up</Link>
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.authSignIn(this.state.email, this.state.password);
  }
};

export default connect(
  state => ({
    user: state.auth.user,
    errMsg: state.auth.errorMessage
  }),
  dispatch => ({
    authSignIn: (email, password) => dispatch(authSignIn(email, password))
    }
  )
)(SignIn)
