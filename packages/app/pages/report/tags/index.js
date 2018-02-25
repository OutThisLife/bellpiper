import _ from 'lodash'
import styled from 'styled-components'
import { Link } from '@/routes'
import Table from '@/components/common/table'
import { format as tagsFormat } from '@/components/common/tags'

const Tags = styled.figure`
tr th:first-child {
  opacity: 0;
}

a {
  font-weight: 700;
  color: rgb(var(--secondary));

  &:hover {
    text-decoration: underline;
  }
}
`

export default ({ entries }) => {
  const all = _.uniq(_.flatten(_.compact(_.map(entries, 'tags')).map(t => t.split(' '))))
  const symbols = _.filter(all, t => /\$/.test(t))
  const tags = _.difference(all, symbols)

  const gen = group => group.map(t => {
    const tagged = _.filter(entries, ({ tags }) => ~(tags || []).indexOf(t))
    const perc = ({ length }, comp = entries) => parseFloat(length / comp.length * 100).toFixed(1)

    return {
      tag: () => (
        <Link route='main' params={{ slug: 'journal', tag: t }}>
          <a>{tagsFormat(t)}</a>
        </Link>
      ),
      trades: tagged.length,
      frequency: `${perc(tagged)}%`,
      'win %': `${perc(_.filter(tagged, ({ result }) => result > 0), tagged)}%`,
      avg: _.sumBy(tagged, 'result') || 0
    }
  })

  return (
    <Tags>
      <h2>Performance by symbol</h2>

      <Table
        head={['Symbol', 'Trades', 'Frequency', 'Win %', 'Avg']}
        data={gen(symbols)}
        orderBy='winrate'
      />

      <br /><br />

      <h2>By tag</h2>

      <Table
        head={['Tag', 'Trades', 'Frequency', 'Win %', 'Avg']}
        data={gen(tags)}
        orderBy='winrate'
      />
    </Tags>
  )
}
