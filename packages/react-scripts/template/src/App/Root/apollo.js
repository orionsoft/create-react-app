import ApolloClient, {createNetworkInterface} from 'apollo-client'
import {addTypenameToSelectionSet} from 'apollo-client/queries/queryTransform'
import {getLoginToken} from 'meteor-apollo-accounts'
import baseURL from './url'

export const createMeteorNetworkInterface = () => {
  let uri = baseURL + '/graphql'
  const networkInterface = createNetworkInterface({uri})

  networkInterface.use([{
    async applyMiddleware (request, next) {
      const currentUserToken = await getLoginToken()
      if (!currentUserToken) next()

      if (!request.options.headers) {
        request.options.headers = {}
      }
      request.options.headers.Authorization = currentUserToken
      next()
    }
  }])

  return networkInterface
}

const config = {
  networkInterface: createMeteorNetworkInterface(),
  queryTransformer: addTypenameToSelectionSet,
  dataIdFromObject: (result) => {
    if (result._id && result.__typename) {
      return result.__typename + ':' + result._id
    }
  },
  shouldBatch: false
}

const apollo = new ApolloClient(config)

export default apollo
