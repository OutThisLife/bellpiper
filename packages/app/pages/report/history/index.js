import Table from '@/components/common/table'
import Result from '@/components/common/result'
import { format as tagsFormat } from '@/components/common/tags'
import dateFormat from '@/helpers/dateFormat'

export default ({ entries, limit }) => (
  <figure style={{ marginTop: 'var(--pad)' }}>
    <h2>Trade History</h2>

    <Table head={['Date:130', 'Tags:90', 'Note', 'Gain:30']}>
      {entries.slice(0, limit).map(({ id, created, tags, desc, result, change }) => (
        <tr key={`history-${id}`}>
          <td data-label='date'>{dateFormat(created, 'M.D.Y')}</td>
          <td data-label='tags'>{tagsFormat(tags)}</td>
          <td data-label='note'>{desc}</td>
          <td data-label='gain'>
            <Result result={result} change={change} />
          </td>
        </tr>
      ))}
    </Table>
  </figure>
)
