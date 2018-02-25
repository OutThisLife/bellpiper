import gql from 'graphql-tag'

const refetch = (query, variables = {}) => ({ query, variables })

const accountFields = `
id
goal
balance
principle
bracket
lastBracket
`

export const GET_ACCOUNT = gql`
{
  user {
    id
    entries { id entryId result change }
    account { ${accountFields} }
  }
}
`

export const REFETCH_ACCOUNT = refetch(GET_ACCOUNT)

export const UPDATE_ACCOUNT = gql`
mutation updateAccount ($input: AccountInput) {
  updateAccount (input: $input) {
    account { ${accountFields} }
  }
}
`

const entryFields = `
id
entryId
title
desc
tags
mood
result
change
image { id }
createdAt
`

export const GET_ENTRIES = gql`
query ($limit: String, $orderBy: OrderBy) {
  user {
    id

    entries(orderBy: $orderBy, limit: $limit) {
      ${entryFields}
    }
  }
}
`

export const REFETCH_ENTRIES = refetch(GET_ENTRIES, {
  entryId: 0,
  limit: '0, 49',
  orderBy: {
    field: 'id',
    direction: 'desc'
  }
})

export const GET_CHILD_ENTRIES = gql`
query ($entryId: Int) {
  user {
    id

    entries(entryId: $entryId) {
      id
      title
      desc
      image { id }
      createdAt
    }
  }
}
`

export const REFETCH_CHILD_ENTRIES = refetch(GET_CHILD_ENTRIES, {
  entryId: 0
})

export const ADD_ENTRY = gql`
mutation addEntry ($input: EntryInput) {
  addEntry(input: $input) {
    ${entryFields}
  }
}
`

export const ADD_CHILD_ENTRY = gql`
mutation addEntry ($input: EntryInput) {
  addEntry(input: $input) {
    id
    entryId
    title
    desc
    image { id }
    createdAt
  }
}
`

export const CLOSE_ENTRY = gql`
mutation closeEntry ($id: Int!, $input: CloseInput) {
  closeEntry(id: $id, input: $input) {
    ${entryFields}
  }
}
`
