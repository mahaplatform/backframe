import React from 'react'
import { Route } from 'react-router'

import Transition from './transition'
import Signin from './signin'
import Activation from './activation'
import ResetClaim from './reset/claim'
import ResetSecurity from './reset/security'
import ResetPassword from './reset/password'

export default (
  <Route component={ Transition }>
    <Route component={ Signin } path="admin/signin" />
    <Route component={ Activation } path="admin/activation/:id" />
    <Route component={ ResetSecurity } path="admin/reset/security" />
    <Route component={ ResetPassword } path="admin/reset/password" />
    <Route component={ ResetClaim } path="admin/reset/:id" />
  </Route>
)
