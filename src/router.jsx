import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import SignIn from './modules/sign-in/SignIn';
import SignUp from './modules/sign-up/SignUp';

const Routes = (
  <BrowserRouter basename="/">
    <Switch>
      <Route exact path='/sign-in' component={SignIn} />
      <Route exact path='/sign-up' component={SignUp} />
      <Redirect path="*" to="/sign-in" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
