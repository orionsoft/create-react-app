import React from 'react'
import styles from './styles.css'
import Translate from 'App/i18n'

export default class TOS extends React.Component {

  static propTypes = {

  }

  render () {
    return (
      <div className={styles.tos}>
        <Translate tr='auth.tos.tos' html />
      </div>
    )
  }

}
