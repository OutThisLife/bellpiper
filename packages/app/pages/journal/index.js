import { Component } from 'react'
import styled from 'styled-components'
import styles from './styles.scss'
import Post from '@/pages/post'
import Controls from './controls'
import Entries from './entries'
import Archive from './archive'

const Container = styled.div`${styles}`

export default class Journal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sortBy: 'id:desc',
      filters: { tags: '' }
    }
  }

  componentWillReceiveProps ({ query }) {
    if (query) {
      this.setTag(query)
    }
  }

  componentDidMount () {
    this.onWindowClick = this.handleWindowClick.bind(this)

    if (this.el) {
      window.addEventListener('click', this.onWindowClick)
    }
  }

  componentDidUpdate () {
    if (this.state.entryEl && !document.body.classList.contains('entry-open')) {
      window.dispatchEvent(new window.CustomEvent('open-post', {
        detail: { el: this.state.entryEl }
      }))
    }
  }

  componentWillUnmount () {
    if (this.el) {
      window.removeEventListener('click', this.onWindowClick)
    }
  }

  handleEntryClick (entryEl, entry) {
    this.setState({ entryEl, entry })
  }

  handleWindowClick ({ target }) {
    if (
      target.classList.contains('content') ||
      target.closest('.inner')
    ) {
      window.dispatchEvent(new window.CustomEvent('close-post'))
    }
  }

  updateState (state) {
    state.entry = false
    state.entryEl = false

    this.setState(Object.assign({}, this.state, state))
  }

  setTag ({ tag }) {
    this.setState({
      filters: {
        pid: 0,
        tags: tag
      }
    })
  }

  render () {
    return (
      <Container>
        <Controls
          {...this.props}
          {...this.state}
          onUpdate={entry => this.setState({
            ...this.state,
            entry
          })}
        />

        <div
          className='inner brackets'
          ref={c => (this.el = c)}
          data-view='grid'
        >
          <section className='bracket-group'>
            <Entries
              {...this.state}
              onUpdate={this.updateState.bind(this)}
              onClick={this.handleEntryClick.bind(this)}
            />
          </section>
        </div>

        {this.state.entry && <Post key={`post-${this.state.entry.id}`} {...this.state.entry} />}
      </Container>
    )
  }
}
