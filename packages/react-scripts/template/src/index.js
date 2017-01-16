import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {AppContainer} from 'react-hot-loader'
import './styles'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
