import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import SignIn from './modules/sign-in/SignIn';
import SignUp from './modules/sign-up/SignUp';
import Feed from './modules/feed/Feed';
import EmailVerify from './modules/email-verify/EmailVerify';
import UserPage from './modules/user-page/UserPage';
import EditProfile from './modules/edit-profile/EditProfile';

const Routes = (
  <BrowserRouter basename="/">
    <Switch>
      <Route exact path='/' component={Feed} />
      <Route exact path='/edit-profile/:nickname' render={(props) => <EditProfile {...props} />} />
      <Route exact path='/profile/:nickname' render={(props) => <UserPage {...props} />} />
      <Route exact path='/sign-in' component={SignIn} />
      <Route exact path='/sign-up' component={SignUp} />
      <Route path='/verify' component={EmailVerify} />
      <Redirect path="*" to="/sign-in" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
