import { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { ADD_ENTRY, REFETCH_ENTRIES } from '@/lib/queries'
import styled from 'styled-components'
import { Router } from '@/routes'
import Modal from '@/components/modal'
import Form from '@/components/common/form'
import Input from '@/components/common/input'
import Attachment from '@/components/common/attachment'
import MDE from '@/components/common/mde'
import { Button } from '@/components/common/button'
import Mood from '@/components/mood'
import Loader from '../../../static/img/loader.svg'

const Container = styled(Form)`
@media (min-width: 767px) {
  width: 400px;
}
`

class AddEntry extends PureComponent {
  componentDidMount () {
    this.onClick = this.handleClick.bind(this)
    this.onKeyDown = this.handleKeyDown.bind(this)
    this.el = document.getElementById('addEntry')

    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('open-add-entry', this.onClick)
  }

  componentWillUnmount () {
    if (this.el) {
      document.body.classList.remove('modal-open')
      this.el.classList.remove('open')
    }

    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('open-add-entry', this.onClick)
  }

  handleClick () {
    if (this.el) {
      document.body.classList.toggle('modal-open')
      this.el.classList.toggle('open')
    }
  }

  handleKeyDown ({ keyCode }) {
    if (
      this.el.classList.contains('open') &&
      ~[27, 88, 67].indexOf(keyCode)
    ) {
      this.handleClick()
    }
  }

  handleSubmit ({ currentTarget }) {
    currentTarget.classList.add('loading')

    const getValue = name => currentTarget.querySelector(`[name="${name}"]`).value
    const title = getValue('title')
    const tags = getValue('tags')
    const desc = this.$textarea.mde.value()
    const mood = currentTarget.querySelector('[name="mood"]:checked').value
    const imageId = getValue('image') || 0

    const input = {
      entryId: 0,
      title,
      desc,
      tags,
      mood,
      image: { id: imageId }
    }

    this.props.mutate({
      variables: { input },
      optimisticResponse: {
        addEntry: Object.assign({}, input, {
          id: Math.random(),
          result: 0,
          change: 0,
          createdAt: +new Date(),
          image: {
            id: imageId,
            __typename: 'Image'
          },
          __typename: 'Entries'
        })
      }
    }).then(({ data: { addEntry: { createdAt } } }) => {
      if (createdAt) {
        currentTarget.classList.remove('loading')
        currentTarget.reset()
        currentTarget.querySelector('em').innerHTML = ''

        window.requestAnimationFrame(() => {
          this.handleClick()

          if (!this.props.query.slug) {
            Router.pushRoute('main', { slug: 'journal' })
          } else {
            document.querySelector('.bracket-group .open').click()
          }
        })
      }
    }).catch(e => {
      console.error(e)
    })
  }

  render () {
    return (
      <Modal
        title='Add New Setup'
        onClick={this.handleClick.bind(this)}
        id='addEntry'
      >
        <Container action='javascript:;' onSubmit={this.handleSubmit.bind(this)}>
          <Input
            type='text'
            name='title'
            placeholder='Title, eg: double top in Tokyo session'
            required
          />

          <Input
            type='text'
            name='tags'
            placeholder='Tags, eg: #short, #eurusd, #fibonacci'
            required
          />

          <MDE
            name='desc'
            ref={c => (this.$textarea = c)}
            placeholder='Explain your reasoning for entering this trade'
          />

          <div className='row stacked' style={{ padding: '0 calc(var(--pad) / 2)' }}>
            <label>How confident are you?</label>
            <Mood />
          </div>

          <footer>
            <Button primary type='submit'>
              Submit <Loader />
            </Button>

            <Attachment style={{ marginLeft: '5px' }} />
          </footer>
        </Container>
      </Modal>
    )
  }
}

export default graphql(ADD_ENTRY, {
  options: {
    update: (store, { data: { addEntry } }) => {
      const data = store.readQuery(REFETCH_ENTRIES)
      data.user.entries.unshift(addEntry)
      store.writeQuery(Object.assign({}, REFETCH_ENTRIES, { data }))
    }
  }
})(AddEntry)
