import { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { CLOSE_ENTRY, REFETCH_ACCOUNT, REFETCH_ENTRIES } from '@/lib/queries'
import styled from 'styled-components'
import Input from '@/components/common/input'
import { Button } from '@/components/common/button'
import Result from '@/components/common/result'

const Container = styled.form`
margin-left: auto;

em {
  color: rgb(var(--gray));
  font-weight: 700;
  font-style: normal;
  text-transform: uppercase;
}
`

class CloseOut extends PureComponent {
  handleSubmit ({ currentTarget }) {
    const { id } = this.props
    const result = parseInt(currentTarget.querySelector('input').value || 0)
    const input = { result, change: 0.0 }

    this.props.mutate({
      variables: { id, input },
      optimisticResponse: {
        closeEntry: Object.assign({}, this.props, input)
      }
    }).then(({ data: { closeEntry } }) => this.props.onUpdate(closeEntry))
  }

  render () {
    return (
      <Container
        id='entry-update-form'
        action='javascript:;'
        onSubmit={this.handleSubmit.bind(this)}
      >
        {this.props.change ? (
          <em>
            closed for&nbsp;
            <Result {...this.props} />
          </em>
        ) : (
          <div className='attached-btn'>
            <Input
              type='text'
              name='result'
              placeholder='Final P/L'
              required
              minLength='1'
            />

            <Button primary type='submit'>
              Close Out
            </Button>
          </div>
        )}
      </Container>
    )
  }
}

export default graphql(CLOSE_ENTRY, {
  options: {
    refetchQueries: [REFETCH_ACCOUNT],
    update: (store, { data: { closeEntry } }) => {
      const data = store.readQuery(REFETCH_ENTRIES)

      data.user.entries.map(e => {
        if (e.id === closeEntry.id) {
          e.result = closeEntry.result
        }
      })

      store.writeQuery(Object.assign({}, REFETCH_ENTRIES, { data }))
    }
  }
})(CloseOut)
