import { graphql } from 'react-apollo'
import { GET_ACCOUNT } from '@/lib/queries'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'
import styles from './styles.scss'
import AccountInfo from './accountInfo'
import NextGoal from './nextGoal'
import Nav from './nav'

const Container = styled.aside`${styles}`
const BlankContainer = Container.extend`
display: flex;
align-items: center;
justify-content: center;
font-size: 4rem;
`

const Sidebar = props => {
  if (props.loading) {
    return (
      <BlankContainer style={{ alignItems: 'flex-start', paddingTop: 30 }}>
        <ContentLoader type='list' style={{ width: '95%' }} />
      </BlankContainer>
    )
  }

  return (
    <Container className='styled-scrollbar'>
      <AccountInfo {...props} />
      <NextGoal {...props.user.account} />
      <Nav {...props} />
    </Container>
  )
}

export default graphql(GET_ACCOUNT, {
  props: ({ data: { loading, user } }) => ({ loading, user })
})(Sidebar)
