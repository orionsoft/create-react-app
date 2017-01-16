import React from 'react'
import apolloClient from './apollo'
import {ApolloProvider} from 'react-apollo'

export default class Root extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <ApolloProvider client={apolloClient}>
        {this.props.children}
      </ApolloProvider>
    )
  }

}
