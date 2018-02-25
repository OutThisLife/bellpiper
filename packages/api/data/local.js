import gql from 'graphql-tag'
import { execute, makePromise } from 'apollo-link'
import ApolloClient from 'apollo-client'
import { SchemaLink } from 'apollo-link-schema'
import { InMemoryCache } from 'apollo-cache-inmemory'
import schema from './schema'

const client = new ApolloClient({
  ssr: true,
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema })
})

const transform = (body, type = 'query') => {
  const q = {}
  q[type] = gql`${type} { ${body} }`
  return q
}

const rawQuery = args => makePromise((execute(client.link, transform(args))))
const query = args => client.query(transform(args))
const mutate = args => client.mutate(transform(args, 'mutation'))

export { client, rawQuery, query, mutate }
