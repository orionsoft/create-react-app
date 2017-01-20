import React from 'react'
import apolloClient from './apollo'
import {ApolloProvider} from 'react-apollo'
import MeProvider from './MeProvider'

export default class Root extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <ApolloProvider client={apolloClient}>
        <MeProvider>
          {this.props.children}
        </MeProvider>
      </ApolloProvider>
    )
  }

}
