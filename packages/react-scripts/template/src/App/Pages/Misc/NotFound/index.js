import React from 'react'
import styles from './styles.css'
import Stars from './Stars'
import {Link} from 'react-router'

export default class NotFound extends React.Component {

  static propTypes = {

  }

  render () {
    return (
      <Stars>
        <div className={styles.container}>
          <p>
            No encontrado
          </p>
          <div>
            <Link to='/'>
              Volver
            </Link>
          </div>
        </div>
      </Stars>
    )
  }

}
