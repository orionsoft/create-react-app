import React from 'react'
import styles from './styles.css'

export default class Stars extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <div>
        <div className={styles.starsParallax}>
          <div className={styles.stars1} />
          <div className={styles.stars2} />
          <div className={styles.stars3} />
          <div className={styles.logoContainer}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }

}
