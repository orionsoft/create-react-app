import React from 'react'
import Translate from 'App/i18n'
import {verifyEmail} from 'meteor-apollo-accounts'
import autobind from 'autobind-decorator'
import {withApollo} from 'react-apollo'

@withApollo
export default class VerifyEmail extends React.Component {

  static propTypes = {
    setLoading: React.PropTypes.func,
    isLoading: React.PropTypes.bool,
    token: React.PropTypes.string,
    onSuccess: React.PropTypes.func,
    client: React.PropTypes.object
  }

  state = {}

  componentDidMount () {
    this.verify()
  }

  @autobind
  async verify () {
    try {
      this.props.setLoading(true)
      await verifyEmail({token: this.props.token}, this.props.client)
      this.props.onSuccess()
      this.props.setLoading(false)
      this.props.client.resetStore()
    } catch (error) {
      this.setState({error: error.message})
      this.props.setLoading(false)
    }
  }

  render () {
    if (this.state.error) {
      return (
        <div className='center-align'>
          {this.state.error}
        </div>
      )
    } else {
      return (
        <div className='center-align'>
          <Translate tr='auth.verifyEmail.verifying' />
        </div>
      )
    }
  }

}
