import React from 'react'
import styles from './styles.css'
import Logo from './Logo'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router'

@withRouter
export default class Layout extends React.Component {

  state = {isLoading: false, error: null}

  static propTypes = {
    children: React.PropTypes.any,
    location: React.PropTypes.object,
    router: React.PropTypes.object,
    params: React.PropTypes.object
  }

  @autobind
  onSuccess () {
    const {location} = this.props
    if (location.state && location.state.nextPathname) {
      this.props.router.replace(location.state.nextPathname)
    } else {
      this.props.router.replace('/')
    }
  }

  renderLogo () {
    return (
      <div className={styles.logo}>
        <Logo color='black' isLoading={this.state.isLoading} />
      </div>
    )
  }

  renderChildren () {
    return React.cloneElement(this.props.children, {
      setError: error => {
        if (error && typeof error === 'string') {
          error = error.replace('GraphQL error: ', '')
        }
        this.setState({error})
      },
      setLoading: isLoading => this.setState({isLoading}),
      isLoading: this.state.isLoading,
      onSuccess: this.onSuccess,
      ...this.props.params
    })
  }

  renderError () {
    if (!this.state.error) return
    return (
      <div className={styles.error}>
        {this.state.error}
      </div>
    )
  }

  render () {
    return (
      <div className={styles.root}>
        <div className={styles.paperContainer}>
          {this.renderLogo()}
          {this.renderError()}
          {this.renderChildren()}
        </div>
      </div>
    )
  }

}
