import React from 'react'
import includes from 'lodash/includes'

export default function (role) {
  return function (ComposedComponent) {
    return class WithRoles extends React.Component {

      static contextTypes = {
        me: React.PropTypes.object
      }

      renderNotAllowed () {
        return (
          <div>
            Not allowed
          </div>
        )
      }

      render () {
        const me = this.context.me || {}
        const roles = me.roles || []
        if (includes(roles, role)) {
          return <ComposedComponent {...this.props} />
        } else {
          return this.renderNotAllowed()
        }
      }
    }
  }
}
