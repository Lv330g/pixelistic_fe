import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Typography, FormControl, Input, Button, InputLabel } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { connect } from 'react-redux';
import { authSignIn } from './../../actions/auth';
import { Redirect } from 'react-router';

import { FormError } from '../../shared/components/form-error/FormError';
import InputEmail from '../../shared/components/input-email/InputEmail';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: { password: '', email: '' },
      passwordValid: false,
      emailValid: false,
      formValid: false,
      accessToken: false
    }
  }

  componentWillMount() {
    let accessToken = window.localStorage.getItem('authHeaders') ?
      JSON.parse(window.localStorage.getItem('authHeaders'))['accessToken'] : null;
    this.setState({ accessToken });
  }

  render() {
    if (this.props.isAuthorized || this.state.accessToken) {
      return <Redirect to='/' />;
    }
    return (
      <Grid container alignItems={"center"} justify={"center"} direction={"column"}>
        <Grid className="sign-in" item xs={5} container alignItems={"center"} justify={"center"} direction={"column"}>
          <Grid className="signin-container" container justify={"center"}>
            <Grid item xs={8} container alignItems={"center"} justify={"flex-start"} direction={"column"}>
              <h1>Pixel</h1>

              <form onSubmit={this.handleSubmit} className="form">
                <InputEmail onValidate={this.onValidate}
                  onChange={this.onChange} />
                <FormError formErrors={this.state.formErrors.email} />
                <FormControl margin={"normal"} fullWidth>
                  <InputLabel htmlFor="inp-password">Password</InputLabel>
                  <Input
                    id="inp-password"
                    type="password"
                    name="password"
                    value={this.state.passsword}
                    onChange={this.onChangePassword}
                    required />
                  <FormError formErrors={this.state.formErrors.password} />
                </FormControl>
                <p className={this.props.errMsg ? 'err-msg msg' : 'msg'}>
                  {console.log(this.props.errMsg)}
                  {this.props.errMsg}
                </p>
                <Button className="submit-btn" type={"submit"} color={"primary"} variant={"contained"} fullWidth disabled={!this.validateForm()}>
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

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangePassword = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) });
  }

  validateField = (fieldName) => {
    let fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case 'password':
        passwordValid = this.state.password.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : 'Password must be at least 6 characters long';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      passwordValid: passwordValid
    });
  }

  validateButtonState = () => {
    this.setState({ formValid: this.validateForm() });
  }

  validateForm = () => {
    return this.state.password.length > 0 && this.state.passwordValid && this.state.emailValid;
  }

  onValidate = (isValid, value) => {
    let fieldValidationErrors = this.state.formErrors;
    fieldValidationErrors.email = isValid ? '' : ' Email is invalid';
    this.setState({ emailValid: isValid, formErrors: fieldValidationErrors, email: value });
    this.validateButtonState();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.authSignIn(this.state.email, this.state.password);
  }
};

export default connect(
  state => ({
    isAuthorized: state.auth.isAuthorized,
    errMsg: state.auth.errorMessage,
  }),
  dispatch => ({
    authSignIn: (email, password) => dispatch(authSignIn(email, password))
  }
  )
)(SignIn)

