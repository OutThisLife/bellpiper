import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-fetch'

const { API } = process.env
const authLink = setContext((_, { headers }) => {
  if (
    typeof document !== 'undefined' &&
    /connect\.sid/.test(document.cookie)
  ) {
    const token = document.cookie.split('connect.sid=')[1].split(';')[0]
    headers.authorization = `Bearer ${token}`
  }

  return { headers }
})

const link = authLink.concat(createHttpLink({
  fetch,
  uri: `${API}/graph`
}))

let client
export default initialState => {
  if (!process.browser || !client) {
    client = new ApolloClient({
      link,
      connectToDevTools: process.browser,
      ssrMode: !process.browser,
      cache: new InMemoryCache(),
      queryDeduplication: true
    })
  }

  return client
}
