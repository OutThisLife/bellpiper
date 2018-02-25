import { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { REFETCH_ACCOUNT, UPDATE_ACCOUNT } from '@/lib/queries'
import styled from 'styled-components'
import styles from './styles.scss'
import Info from './info'
import { Button } from '@/components/common/button'

const Form = styled.form`${styles}`

class AccountInfo extends PureComponent {
  handleSubmit ({ currentTarget }) {
    const $inputs = currentTarget.getElementsByTagName('input')

    const principle = parseFloat($inputs[0].value)
    const goal = parseFloat($inputs[1].value)
    const balance = principle

    const input = {
      principle,
      goal,
      balance,
      lastBracket: principle,
      bracket: parseInt(principle + (principle * (goal / 100)))
    }

    if (window.confirm('Changing this will reorganize your brackets, are you sure?')) {
      this.props.mutate({
        variables: { input },
        optimisticResponse: {
          updateAccount: {
            account: Object.assign({}, input, {
              id: Math.random(),
              __typename: 'Account'
            }),
            __typename: 'Account'
          }
        }
      })
    }
  }

  render () {
    return (
      <Form action='javascript:;' onSubmit={this.handleSubmit.bind(this)}>
        <Info {...this.props.user.account} />

        <footer>
          <Button type='submit'>Save</Button>
        </footer>
      </Form>
    )
  }
}

export default graphql(UPDATE_ACCOUNT, {
  options: {
    update: (store, { data: { updateAccount: { account } } }) => {
      const data = store.readQuery(REFETCH_ACCOUNT)
      data.user.account = account
      store.writeQuery(Object.assign({}, REFETCH_ACCOUNT, { data }))
    }
  }
})(AccountInfo)
