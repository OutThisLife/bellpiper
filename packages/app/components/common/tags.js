import styled from 'styled-components'
import { Link } from '@/routes'

const Tags = styled.div`
a {
  display: inline-block;
  color: rgb(var(--gray));

  &:not(:last-child) {
    margin-right: 5px;
  }

  &:hover {
    color: rgb(var(--secondary));
    text-decoration: underline;
  }
}
`

export const format = tags => tags.split(' ').map(t => !/#|\$/.test(t) ? `#${t}` : t).sort((a, b) => b.indexOf('$') - a.indexOf('$'))

export default ({ list }) => (
  <Tags onClick={(e => e.stopPropagation())}>
    {list && format(list).map(tag => (
      <Link
        key={Math.random()}
        route='main'
        params={{ slug: 'journal', tag: tag.substr(1) }}
      >
        <a>{tag}</a>
      </Link>
    ))}
  </Tags>
)
