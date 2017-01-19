import React from 'react'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import MeProvider from './MeProvider'

@withGraphQL(gql`query getMe {
  me {
    _id
    roles
  }
}`)
export default class Layout extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    me: React.PropTypes.object
  }

  render () {
    return (
      <MeProvider me={this.props.me}>
        {this.props.children}
      </MeProvider>
    )
  }

}
