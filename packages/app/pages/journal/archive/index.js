import { graphql } from 'react-apollo'
import { GET_ENTRIES } from '@/lib/queries'
import Entry from '@/pages/journal/entries/entry'
import { Container } from '@/pages/journal/entries'

const Archive = ({ loading, user, onClick }) => {
  if (loading) {
    return null
  }

  return (
    <section className='bracket-group collapsed'>
      <Container>
        {user.entries.map((entry, i) => (
          <Entry
            {...entry}
            key={`entry-${entry.id}`}
            onClick={(i, e) => {
              const el = e.target.closest('figure')

              if (el) {
                e.stopPropagation()
                onClick(el, entry)
              }
            }}
          />
        ))}
      </Container>
    </section>
  )
}

export default graphql(GET_ENTRIES, {
  options: {
    variables: {
      limit: '49, 9999',
      orderBy: {
        field: 'updatedAt',
        direction: 'ASC'
      }
    }
  },
  props: ({ data: { loading, user } }) => ({ loading, user })
})(Archive)
