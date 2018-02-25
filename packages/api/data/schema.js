import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
scalar Buffer

type User {
  id: Int!
  email: String
  salt: String
  digest: String
  ip: String
  account: Account
  createdAt: String

  entries(
    entryId: Int = 0
    limit: String = "0, 49"
    orderBy: OrderBy
  ): [Entries]
}

type Account {
  id: Int!
  balance: Float
  goal: Float
  principle: Float
  history: String
  bracket: Int
  lastBracket: Int
  createdAt: String
  updatedAt: String
}

type Entries {
  id: Int!
  entryId: Int
  title: String
  desc: String
  tags: String
  mood: String
  img: Int
  result: Float
  change: Float
  image: Image
  createdAt: String
  updatedAt: String
}

type Image {
  id: Int!
  name: String
  size: Int
  mimetype: String
  buffer: Buffer
  createdAt: String
}

input OrderBy {
  field: String = "id"
  direction: String = "asc"
}

input UserInput {
  email: String!
  password: String
  ip: String!
  provider: String
}

input AccountInput {
  userId: Int
  balance: Float
  principle: Float
  goal: Float
  history: String
  bracket: Int
  lastBracket: Int
}

input EntryInput {
  entryId: Int!
  title: String!
  desc: String!
  tags: String
  mood: String
  image: EntryImage
}

input EntryImage {
  id: Int!
}

input ImageInput {
  name: String!
  size: Int!
  mimetype: String!
  buffer: Buffer!
}

input CloseInput {
  result: Float!
  change: Float
}

type Query {
  user: User
  entry(id: Int!): Entries
  image(id: Int!): Image
}

type Mutation {
  login(input: UserInput): User
  updateAccount(input: AccountInput): User

  addEntry(input: EntryInput): Entries
  closeEntry(id: Int!, input: CloseInput): Entries
  deleteEntry(id: Int!): Entries
}
`

export default makeExecutableSchema({ typeDefs, resolvers })
