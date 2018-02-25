import graphql from 'express-graphql'
import schema from '../data/schema'

const { NODE_ENV } = process.env

export default app => app.use('/graph', graphql((req, res) => ({
  schema,
  context: req,
  graphiql: NODE_ENV !== 'production'
})))
