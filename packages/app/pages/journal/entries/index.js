import { graphql } from 'react-apollo'
import { GET_ENTRIES } from '@/lib/queries'
import Fuse from 'fuse.js'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'
import { Entry, Dummy } from './entry'

export const Container = styled.div`
display: flex;
flex-wrap: wrap;
align-items: flex-start;
`

const Entries = ({ loading, entries, onUpdate, onClick }) => {
  if (loading) {
    return (
      <Container style={{ height: '100vh' }}>
        <ContentLoader height={500} style={{ width: '100%', height: 'auto' }}>
          <rect x='0' y='0' rx='0' ry='0' width='23%' height='100px' />
          <rect x='25%' y='0' rx='0' ry='0' width='23%' height='100px' />
          <rect x='50%' y='0' rx='0' ry='0' width='23%' height='100px' />
          <rect x='75%' y='0' rx='0' ry='0' width='23%' height='100px' />
        </ContentLoader>
      </Container>
    )
  }

  return (
    <Container>
      {onUpdate && <Dummy />}
      {entries.map((entry, i) => (
        <Entry
          {...entry}
          key={`entry-${entry.id}`}
          onClick={(i, e) => {
            const el = e.target.closest('figure')

            if (el && e.target.tagName !== 'A') {
              e.stopPropagation()
              onClick(el, entry)
            }
          }}
        />
      ))}
    </Container>
  )
}

export default graphql(GET_ENTRIES, {
  options: ({ sortBy }) => ({
    variables: {
      limit: '0, 49',
      orderBy: {
        field: sortBy.split(':')[0],
        direction: sortBy.split(':')[1]
      }
    }
  }),
  props: (
    { data: { loading, user },
    ownProps: { sortBy, filters } }
  ) => ({
    loading,
    entries: (() => {
      if (!user) {
        return []
      } else if (!filters.tags) {
        return user.entries
      }

      return new Fuse(user.entries, {
        tokenize: true,
        matchAllTokens: true,
        threshold: 0.1,
        keys: ['tags']
      }).search(filters.tags)
    })()
  })
})(Entries)
