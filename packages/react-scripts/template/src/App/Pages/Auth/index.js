import React from 'react'
import {Route} from 'react-router'
import Layout from './Layout'
import Login from './Login'
import Register from './Register'
import VerifyEmail from './VerifyEmail'
import Forgot from './Forgot'
import Reset from './Reset'
import Enroll from './Enroll'

export default (
  <Route component={Layout}>
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/verify-email/:token' component={VerifyEmail} />
    <Route path='/forgot' component={Forgot} />
    <Route path='/reset/:token' component={Reset} />
    <Route path='/enroll/:token' component={Enroll} />
  </Route>
)
