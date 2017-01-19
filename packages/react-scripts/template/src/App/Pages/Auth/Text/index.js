import React from 'react'
import styles from './styles.css'

export default class Text extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    fieldType: React.PropTypes.string,
    passProps: React.PropTypes.object,
    placeholder: React.PropTypes.node
  }

  static defaultProps = {
    fieldType: 'text'
  }

  render () {
    return (
      <div className={styles.container}>
        <input
          className={styles.input}
          type={this.props.fieldType}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={event => this.props.onChange(event.target.value)}
          {...this.props.passProps} />
      </div>
    )
  }

}
