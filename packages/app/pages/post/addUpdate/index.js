import { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { ADD_CHILD_ENTRY, REFETCH_CHILD_ENTRIES } from '@/lib/queries'
import Input from '@/components/common/input'
import Attachment from '@/components/common/attachment'
import { Button } from '@/components/common/button'

class AddUpdate extends PureComponent {
  handleSubmit ({ currentTarget }) {
    currentTarget.classList.add('loading')

    const getValue = name => currentTarget.querySelector(`[name="${name}"]`).value

    const entryId = this.props.entryId
    const title = `Reply to ${entryId}`
    const desc = getValue('update')
    const imageId = getValue('image') || 0

    const input = {
      entryId,
      title,
      desc,
      image: { id: imageId }
    }

    this.props.mutate({
      variables: { input },
      optimisticResponse: {
        addEntry: Object.assign({}, input, {
          id: Math.random(),
          createdAt: +new Date(),
          image: {
            id: imageId,
            __typename: 'Image'
          },
          __typename: 'Entries'
        })
      }
    }).then(() => {
      currentTarget.classList.remove('loading')
      currentTarget.reset()
      currentTarget.querySelector('em').innerHTML = ''
    }).catch(e => console.error(e))
  }

  render () {
    return (
      <form
        action='javascript:;'
        className='attached-btn'
        onSubmit={this.handleSubmit.bind(this)}
      >
        <Input type='text' name='update' placeholder='Add a trade update' />

        <Button primary type='submit'>
          Send
        </Button>

        <Attachment />
      </form>
    )
  }
}

export default graphql(ADD_CHILD_ENTRY, {
  options: {
    update: (store, { data: { addEntry } }) => {
      REFETCH_CHILD_ENTRIES.variables = {
        entryId: addEntry.entryId
      }

      const data = store.readQuery(REFETCH_CHILD_ENTRIES)
      data.user.entries.unshift(addEntry)
      store.writeQuery(Object.assign({}, REFETCH_CHILD_ENTRIES, { data }))
    }
  }
})(AddUpdate)
