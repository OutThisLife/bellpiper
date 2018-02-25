import { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { GET_ACCOUNT } from '@/lib/queries'
import styles from './styles.scss'
import IconGrid from '../../../static/img/icon-gridView.svg'
import IconList from '../../../static/img/icon-articleView.svg'
import { Toolbar } from '@/components/toolbar'
import Input from '@/components/common/input'
import Select from '@/components/common/select'
import Tags from '@/components/common/tags'
import CloseOut from './closeOut'

const Container = Toolbar.extend`${styles}`

class Controls extends PureComponent {
  componentDidMount () {
    this.$entries = document.querySelector('.brackets')
  }

  handleViewToggle (c, { currentTarget }) {
    this.$entries.classList.add('change-view')

    this.$entries.setAttribute('data-view', c)
    currentTarget.classList.add('active')

    const $adjacent = currentTarget.previousElementSibling || currentTarget.nextElementSibling
    if ($adjacent) {
      $adjacent.classList.remove('active')
    }

    window.requestAnimationFrame(() => this.$entries.classList.remove('change-view'))
  }

  handleSort ({ currentTarget }) {
    this.props.onUpdate({ sortBy: currentTarget.value })
  }

  handleSearch ({ currentTarget }) {
    this.props.onUpdate({
      filters: {
        entryId: 0,
        tags: currentTarget.value
      }
    })
  }

  render () {
    if (this.props.loading) {
      return <Container />
    }

    const {
      entry,
      filters,
      user: { account: { lastBracket, bracket } }
    } = this.props

    return (
      <Container innerRef={c => (this.el = c)}>
        <div className='group'>
          <h2>Bracket<br />{lastBracket} &rarr; {bracket}</h2>

          <nav>
            <a
              href='javascript:;'
              className='active'
              onClick={this.handleViewToggle.bind(this, 'grid')}
            >
              <IconGrid />
            </a>

            <a
              href='javascript:;'
              onClick={this.handleViewToggle.bind(this, 'list')}
            >
              <IconList />
            </a>

            <Select
              name='sort'
              className='hide-for-small'
              onChange={this.handleSort.bind(this)}
            >
              <option value='id:desc'>Sort by date (DESC)</option>
              <option value='id:asc'>Sort by date (ASC)</option>
              <option value='result:desc'>Sort by P/L (DESC)</option>
              <option value='result:asc'>Sort by P/L (ASC)</option>
            </Select>

            <Input
              type='search'
              name='search'
              placeholder='Search by tags'
              className='hide-for-small'
              value={filters.tags || ''}
              onChange={this.handleSearch.bind(this)}
            />
          </nav>
        </div>

        <div className='group'>
          <h2>
            <a href='javascript:;' onClick={() => {
              window.dispatchEvent(new window.CustomEvent('close-post'))
            }}>&larr; Back</a>
          </h2>

          {entry && (
            <nav id='entry-tags'>
              <Tags list={entry.tags} />
            </nav>
          )}

          {entry && (
            <CloseOut
              {...entry}
              onUpdate={this.props.onUpdate.bind(this)}
            />
          )}
        </div>
      </Container>
    )
  }
}

export default graphql(GET_ACCOUNT, {
  props: ({ data: { loading, user } }) => ({ loading, user })
})(Controls)
