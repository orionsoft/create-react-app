import React from 'react'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Provider from './Provider'

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
      <Provider me={this.props.me}>
        {this.props.children}
      </Provider>
    )
  }

}
