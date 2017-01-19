import React from 'react'
import FacebookLogin from 'react-facebook-login'
import autobind from 'autobind-decorator'
import GoogleLogin from 'react-google-login'
import {loginWithFacebook, loginWithGoogle, loginWithLinkedIn} from 'meteor-apollo-accounts'
import styles from './styles.css'
import LinkedIn from 'react-linkedin-login'
import {withApollo} from 'react-apollo'

@withApollo
export default class Social extends React.Component {

  static propTypes = {
    setLoading: React.PropTypes.func,
    setError: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
    client: React.PropTypes.object
  }

  @autobind
  start () {
    this.props.setLoading(true)
    this.props.setError(null)
  }

  @autobind
  async callbackFacebook ({accessToken}) {
    if (!accessToken) return
    try {
      await loginWithFacebook({accessToken}, this.props.client)
      this.props.onSuccess()
    } catch (error) {
      console.log('error', error)
      this.props.setError(error.message)
      this.props.setLoading(false)
    }
  }

  @autobind
  async callbackLinkedIn ({code, redirectUri}) {
    if (!code) return
    try {
      this.props.setLoading(true)
      await loginWithLinkedIn({code, redirectUri}, this.props.client)
      this.props.onSuccess()
    } catch (error) {
      console.log('error', error)
      this.props.setError(error.message)
      this.props.setLoading(false)
    }
  }

  @autobind
  async successGoogle ({accessToken}) {
    if (!accessToken) return
    try {
      this.props.setLoading(true)
      this.props.setError(null)
      await loginWithGoogle({accessToken}, this.props.client)
      this.props.onSuccess()
    } catch (error) {
      console.log('error with google', error)
      this.props.setError(error.message)
      this.props.setLoading(false)
    }
  }

  @autobind
  failureGoogle (error) {
    console.log('error with google', error)
    this.props.setError(error.message)
    this.props.setLoading(false)
  }

  render () {
    return (
      <div className={styles.social}>
        <FacebookLogin
          appId='FBAPPID'
          fields='name,email,picture'
          callback={this.callbackFacebook}
          cssClass={styles.facebook}
          textButton='Facebook'
          onClick={this.start} />
        <GoogleLogin
          clientId='GOOGLECLIENTID'
          buttonText='Google'
          className={styles.google}
          onSuccess={this.successGoogle}
          onFailure={this.failureGoogle}
          onRequest={this.start} />
        <LinkedIn
          clientId='LINKEDINCLIENTID'
          callback={this.callbackLinkedIn}
          className={styles.linkedin}
          text='LinkedIn' />
      </div>
    )
  }

}
