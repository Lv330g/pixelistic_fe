import React from 'react';
import { Link } from 'react-router-dom'

import { Grid, Typography, FormControl, Input, Button, InputLabel } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const SignIn = () => {
  return <Grid className="sign-in" item xs={5} container alignItems={"center"} justify={"center"} direction={"column"}>
    <Grid className="signin-container" container justify={"center"}>
      <Grid item xs={8} container alignItems={"center"} justify={"flex-start"} direction={"column"}>
        <h1>Pixel</h1>

        <form>
          <FormControl margin={"normal"} fullWidth>
            <InputLabel htmlFor="inp-email">Email</InputLabel>
            <Input id="inp-email" autoFocus type={"email"} required />
          </FormControl>
          <FormControl margin={"normal"} fullWidth>
            <InputLabel htmlFor="inp-password">Password</InputLabel>
            <Input id="inp-password" type={"password"} required />
          </FormControl>

          <Button className="submit-btn" type={"submit"} color={"primary"} variant={"contained"} fullWidth>
            <AccountCircle className="signin-icon" />
            Log In
          </Button>
        </form>

        <p>
          <Link className="reset_link" to="#">Forgot password?</Link>
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
};

export default SignIn;
