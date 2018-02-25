import { Component } from 'react'
import styled from 'styled-components'
import { orderBy } from 'lodash'

const Container = styled.table`
table-layout: fixed;
border-collapse: collapse;
width: 100%;
font-size: 12px;

&.disabled {
  pointer-events: none;
  opacity: .5;
}

@media (min-width: 767px) {
  th, td {
    padding: 7px 0;
    text-align: left;

    &:last-child {
      text-align: right;
    }
  }

  th {
    user-select: none;
    cursor: pointer;
    border-bottom: 1px solid rgba(var(--gray), .3);
  }

  tr:first-child td {
    padding-top: 15px;
  }
}

@media (max-width: 767px) {
  display: block;

  tbody, tr, td {
    display: inherit;
  }

  thead {
    display: none;
  }

  tr {
    padding: calc(var(--pad) / 2) 0;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(var(--gray), .3);
    }
  }

  td {
    + td {
      margin-top: calc(var(--pad) / 2);
    }

    &:before {
      content: attr(data-label)':';
      display: inline-block;
      font-weight: 700;
      text-transform: uppercase;
      margin: 0 5px 0 0;
    }

    &[data-label='note']:before {
      display: block;
      margin: 0 0 5px;
    }
  }
}
`

export default class Table extends Component {
  constructor (props) {
    super(props)
    this.state = { flip: 1, data: [] }
  }

  componentWillMount () {
    if (this.props.data.length !== 0) {
      this.setState({
        data: orderBy(this.props.data, this.props.orderBy, 'desc')
      })
    }
  }

  componentDidMount () {
    if (this.state.data.length === 0) {
      this.el.classList.add('disabled')
    }
  }

  handleClick (orderBy, { currentTarget }) {
    const flip = !this.state.flip

    this.setState({
      flip,
      data: orderBy(this.props.data, orderBy, flip ? 'asc' : 'desc')
    })
  }

  render () {
    return (
      <Container innerRef={c => (this.el = c)}>
        {this.props.head && (
          <thead>
            <tr>
              {this.props.head.map(h => {
                const parts = h.split(':')

                return (
                  <th
                    key={h}
                    width={parts[1] || 'auto'}
                    onClick={this.handleClick.bind(this, h.toLowerCase())}
                    dangerouslySetInnerHTML={{ __html: parts[0] }}
                  />
                )
              })}
            </tr>
          </thead>
        )}

        <tbody>
          {this.state.data.map(row => (
            <tr key={Math.random()}>
              {Object.keys(row).map(col => {
                const Dummy = row[col]

                return (
                  <td key={Math.random()} data-label={col}>
                    {typeof Dummy === 'function' ? <Dummy /> : Dummy}
                  </td>
                )
              })}
            </tr>
          ))}

          {_.isEmpty(this.state.data) && (
            <tr>
              <td colSpan={this.props.head.length} style={{ textAlign: 'center' }}>
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </Container>
    )
  }
}
