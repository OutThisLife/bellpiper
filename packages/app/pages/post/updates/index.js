import { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { GET_CHILD_ENTRIES } from '@/lib/queries'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'
import styles from './styles.scss'
import dateFormat from '@/helpers/dateFormat'

const { API } = process.env
const Table = styled.table`${styles}`

class Updates extends PureComponent {
  handleClick ({ currentTarget }) {
    window.dispatchEvent(new window.CustomEvent('open-lbox', {
      detail: { img: currentTarget.src.split('?')[0], autoclose: false }
    }))
  }

  render () {
    if (this.props.loading) {
      return (
        <div>
          <ContentLoader type='bullet-list' style={{ width: '200px', marginTop: 20 }} />
        </div>
      )
    }

    const { entries } = this.props.user

    return (
      <Table>
        <thead>
          <tr>
            <th width={30}>#</th>
            <th width={50}>Img</th>
            <th>Update</th>
            <th>Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {entries.map(({ id, image, desc, createdAt }) => (
            <tr key={`update-${id}`}>
              <td><span /></td>

              <td>
                {image && (
                  <a href='javascript:;'>
                    <img src={`${API}/img/${image.id}?size=50`} onClick={this.handleClick.bind(this)} />
                  </a>
                )}
              </td>

              <td>{desc}</td>
              <td>{dateFormat(createdAt, 'M/D/Y')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}

export default graphql(GET_CHILD_ENTRIES, {
  options: ({ entryId }) => ({
    variables: { entryId }
  }),
  props: ({ data: { loading, user } }) => ({ loading, user })
})(Updates)
