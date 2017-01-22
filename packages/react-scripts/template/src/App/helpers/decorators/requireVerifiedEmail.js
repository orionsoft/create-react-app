import React from 'react'
import Button from 'App/components/Button'
import autobind from 'autobind-decorator'

const styles = {
  container: {
    textAlign: 'center',
    padding: 20
  },
  notAllowed: {
    fontSize: 20,
    color: 'red'
  },
  needVerify: {
    fontSize: 14,
    marginTop: 10,
    color: '#5c5c5c'
  },
  button: {
    marginTop: 10
  },
  email: {
    marginTop: 10,
    fontSize: 13,
    color: '#5c5c5c'
  }
}

export default function (ComposedComponent) {
  class WithRoles extends React.Component {

    static contextTypes = {
      me: React.PropTypes.object,
      resendVerificationEmail: React.PropTypes.func
    }

    @autobind
    async sendVerificationEmail () {
      const me = this.context.me || {}
      const emails = me.emails || []
      const email = emails[0] || {}
      await this.context.resendVerificationEmail({email: email.address})
    }

    renderNotAllowed () {
      const me = this.context.me || {}
      const emails = me.emails || []
      const email = emails[0] || {}
      return (
        <div style={styles.container}>
          <div style={styles.notAllowed}>
            Not allowed
          </div>
          <div style={styles.needVerify}>
            You need to verify your email
          </div>
          <div style={styles.button}>
            <Button primary onClick={this.sendVerificationEmail}>
              Send verification email
            </Button>
          </div>
          <div style={styles.email}>
            {email.address}
          </div>
        </div>
      )
    }

    render () {
      const me = this.context.me || {}
      const emails = me.emails || []
      const email = emails[0] || {}
      const verified = email.verified || false
      if (verified) {
        return <ComposedComponent {...this.props} />
      } else {
        return this.renderNotAllowed()
      }
    }
  }

  return WithRoles
}
