import React from 'react'
import styles from './styles.css'
import _ from 'underscore'

export default class Button extends React.Component {

  static propTypes = {
    to: React.PropTypes.string,
    linkButton: React.PropTypes.bool,
    label: React.PropTypes.any,
    children: React.PropTypes.any,
    primary: React.PropTypes.bool,
    danger: React.PropTypes.bool,
    big: React.PropTypes.bool,
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool,
    loading: React.PropTypes.bool,
    fullWidth: React.PropTypes.bool
  }

  static defaultProps = {
    linkButton: false,
    primary: false,
    danger: false,
    big: false,
    style: {},
    disabled: false,
    fullWidth: false
  }

  getChildProps () {
    const omitKeys = _.allKeys(Button.propTypes)
    if (this.props.disabled || this.props.loading) {
      omitKeys.push('onClick')
    }
    return _.omit(this.props, ...omitKeys)
  }

  getClassName () {
    const classes = [styles.button]
    if (this.props.disabled) {
      classes.push(styles.disabled)
    } else if (this.props.loading) {
      classes.push(styles.loading)
    } else if (this.props.danger) {
      classes.push(styles.danger)
    } else if (this.props.primary) {
      classes.push(styles.primary)
    }
    if (this.props.big) {
      classes.push(styles.big)
    }
    if (this.props.fullWidth) {
      classes.push(styles.fullWidth)
    }
    return classes.join(' ')
  }

  renderInner () {
    if (this.props.label) {
      return this.props.label
    } else {
      return this.props.children
    }
  }

  renderButton () {
    return (
      <span className={this.getClassName()} style={this.props.style}>
        {this.renderInner()}
      </span>
    )
  }

  renderLinkButton () {
    return (
      <a {...this.getChildProps()}>
        {this.renderButton()}
      </a>
    )
  }

  render () {
    if (this.props.linkButton || this.props.href || this.props.to) {
      return this.renderLinkButton()
    } else {
      return (
        <span {...this.getChildProps()}>
          {this.renderButton()}
        </span>
      )
    }
  }

}
