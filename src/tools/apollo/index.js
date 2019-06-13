import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError as OnError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'

const cache = new InMemoryCache()
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})
const errorLink = new OnError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`)
    )
  }
  if (networkError) {
    console.log(
      `[Network error ${operation.operationName}]: ${networkError.message}`
    )
  }
})
const authLink = setContext((_, { headers, ...rest }) => {
  const token = window.localStorage.getItem('access-token')
  const context = {
    ...rest,
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
  return context
})
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, authLink, httpLink])
})
export default client
