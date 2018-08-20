import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';

import SignIn from './modules/sign-in/SignIn';
import SignUp from './modules/sign-up/SignUp';
import Feed from './modules/feed/Feed';
import EmailVerify from './modules/email-verify/EmailVerify';
import UserPage from './modules/user-page/UserPage';
import EditProfile from './modules/edit-profile/EditProfile';
import UploadPhoto from './modules/upload-photo/UploadPhoto';
import MainLayout from './modules/main-layout/MainLayout';
import AuthLayout from './modules/auth-layout/AuthLayout';

const Routes = (
  <BrowserRouter basename="/">
    <Switch>
      <AuthLayout exact path="/sign-in" component={SignIn}/>
      <AuthLayout exact path='/sign-up' component={SignUp} />
      <AuthLayout path='/verify' component={EmailVerify} />

      <MainLayout exact path="/" component={Feed}/> 
      <MainLayout exact path='/edit-profile/:nickname' component={EditProfile} />
      <MainLayout exact path='/profile/:nickname'  component={UserPage} />
      <MainLayout exact path='/upload' component={UploadPhoto}/>
      <Redirect path="*" to="/sign-in" />

    </Switch>
  </BrowserRouter>
);

export default Routes;
