import { graphql } from 'react-apollo'
import { GET_ACCOUNT } from '@/lib/queries'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'
import Stats from './stats/'
import Line from '@/components/charts/line'

export const Container = styled.div`
display: flex;
align-items: flex-start;
flex-wrap: wrap;
position: relative;
width: 100%;
height: calc(100vh - 70px);
text-align: center;
`

export const Graph = styled.section`
align-self: flex-end;
position: relative;
width: 100%;
overflow: hidden;

@media (min-width: 767px) {
  height: 50vh;
}

canvas, img {
  max-width: none;
  width: 100%;

  @media (min-width: 767px) {
    height: 50vh;
  }
}
`

export default graphql(GET_ACCOUNT, {
  props: ({ data: { loading, user } }) => ({ loading, user })
})(({ loading, user }) => {
  if (loading) {
    return (
      <Container style={{
        alignSelf: 'center',
        alignItems: 'center'
      }}>
        <ContentLoader type='code' width={400} style={{
          width: '70%',
          margin: '20px auto 0'
        }} />
      </Container>
    )
  }

  return (
    <Container className='inner'>
      <Stats {...user} />

      {user.account.history && (
        <Graph>
          <Line
            id='equity'
            datasets={[{ data: user.account.history.split(',').slice(1).map(parseFloat), borderWidth: 2 }]}
          />
        </Graph>
      )}
    </Container>
  )
})
