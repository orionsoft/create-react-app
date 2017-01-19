import React from 'react'
import {Link} from 'react-router'

export default {
  login: 'Login',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm password',
  register: 'Register',
  passwordDoesntMatch: 'Passwords doesn\'t match',
  otherLinksInRegister: () => <div>If you have an account <Link to='/login'>login</Link>.</div>,
  otherLinksInLogin: () => <div>If you don't have an account you can <Link to='/register'>register</Link>. If you forgot your password click <Link to='/forgot'>here</Link>.</div>
}
