import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Landing from '../pages/Landing';
import AddPlant from '../pages/AddPlant';
import PlantInfo from '../pages/PlantInfo';
import Dashboard from '../pages/Dashboard';
import ConfirmEmail from '../pages/ConfirmEmail';
import ResetPassword from '../pages/ResetPassword';
import ChangePassword from '../pages/ChangePassword';
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

    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/add-plant" component={AddPlant} isPrivate />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/plant-info" component={PlantInfo} isPrivate />
    <Route path="/change-password" component={ChangePassword} isPrivate />
  </Switch>
);

export default Routes;
