import ApolloClient, {createBatchingNetworkInterface} from 'apollo-client'
import {getLoginToken, onTokenChange} from 'meteor-apollo-accounts'
import baseURL from './url'

export const createMeteorNetworkInterface = () => {
  const networkInterface = createBatchingNetworkInterface({
    uri: baseURL + '/graphql',
    batchingInterface: true,
    batchInterval: 10
  })

  networkInterface.use([{
    async applyBatchMiddleware (request, next) {
      const currentUserToken = await getLoginToken()
      if (!currentUserToken) next()

      if (!request.options.headers) {
        request.options.headers = {}
      }
      request.options.headers.Authorization = currentUserToken
      next()
      // setTimeout(next, 2000)
    }
  }])

  return networkInterface
}

const config = {
  networkInterface: createMeteorNetworkInterface(),
  queryDeduplication: true,
  // queryTransformer: addTypenameToSelectionSet,
  dataIdFromObject: (result) => {
    if (result._id && result.__typename) {
      return result.__typename + ':' + result._id
    }
  },
  shouldBatch: false
}

const apollo = new ApolloClient(config)

onTokenChange(function () {
  apollo.resetStore()
})

export default apollo
