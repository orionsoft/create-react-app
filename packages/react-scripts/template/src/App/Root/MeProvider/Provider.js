import React from 'react'

export default class Component extends React.Component {

  static propTypes = {
    me: React.PropTypes.object,
    children: React.PropTypes.node
  }

  static childContextTypes = {
    me: React.PropTypes.object
  }

  getChildContext () {
    return {
      me: this.props.me
    }
  }

  render () {
    return <div>{this.props.children}</div>
  }

}
