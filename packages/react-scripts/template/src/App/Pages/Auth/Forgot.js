import React from 'react'
import Translate from 'App/i18n'
import translate from 'App/i18n/translate'
import {Form, Field} from 'simple-react-form'
import Text from './Text'
import Button from 'orionsoft-parts/lib/components/Button'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import {forgotPassword} from 'meteor-apollo-accounts'
import {withApollo} from 'react-apollo'

@withApollo
export default class Forgot extends React.Component {

  state = {}

  static propTypes = {
    setLoading: React.PropTypes.func,
    isLoading: React.PropTypes.bool,
    setError: React.PropTypes.func,
    client: React.PropTypes.object
  }

  @autobind
  async send () {
    if (!this.canSend()) return
    this.props.setLoading(true)
    this.props.setError(null)
    try {
      await forgotPassword(this.state, this.props.client)
      this.setState({isReady: true})
      this.props.setLoading(false)
    } catch (e) {
      this.props.setError(e.message)
      this.props.setLoading(false)
    }
  }

  canSend () {
    return this.state.email
  }

  renderButtons () {
    return (
      <div className={styles.buttonsContainer}>
        <Button primary loading={this.props.isLoading} disabled={!this.canSend()} onClick={this.send}>
          <Translate tr='auth.forgot.resetPassword' />
        </Button>
      </div>
    )
  }

  renderReady () {
    return (
      <div>
        <Translate tr='auth.forgot.ready' />
      </div>
    )
  }

  render () {
    if (this.state.isReady) return this.renderReady()
    return (
      <div>
        <Form state={this.state} onChange={changes => this.setState(changes)} onSubmit={this.send}>
          <Field
            fieldName='email'
            type={Text}
            fieldType='email'
            placeholder={translate('auth.pages.email')} />
        </Form>
        {this.renderButtons()}
      </div>
    )
  }

}
