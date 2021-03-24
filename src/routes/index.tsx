import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Landing from '../pages/Landing';
import ConfirmEmail from '../pages/ConfirmEmail';
import ResetPassword from '../pages/ResetPassword';
import ForgotPassword from '../pages/ForgotPassword';
import MailNotification from '../pages/MailNotification';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/" exact component={Landing} />
    <Route path="/confirm-email" component={ConfirmEmail} />
    <Route path="/reset-password" component={ResetPassword} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/mail-notification" component={MailNotification} />
  </Switch>
);

export default Routes;
