import styled from 'styled-components'

const Tag = styled.a`
display: inline-block;
color: rgb(var(--gray));

&:not(:last-child) {
  margin-right: 5px;
}

&:hover {
  color: rgb(var(--secondary));
  text-decoration: underline;
}
`

export const format = tags => tags.split(' ').map(t => !/#|\$/.test(t) ? `#${t}` : t).sort((a, b) => b.indexOf('$') - a.indexOf('$'))

export default ({ list }) => (
  <div onClick={(e => e.stopPropagation())}>
    {list && format(list).map(tag => <Tag dangerouslySetInnerHTML={{ __html: tag }} />)}
  </div>
)
