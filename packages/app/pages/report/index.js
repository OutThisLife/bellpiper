import { graphql } from 'react-apollo'
import { GET_ACCOUNT } from '@/lib/queries'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'
import styles from './styles.scss'
import { Graph as HomeGraph } from '@/pages/home'
import Circle from '@/components/charts/circle'
import Line from '@/components/charts/line'
import Meta from '@/components/meta'
import Result from '@/components/common/result'
import RoR from './ror'
import Tags from './tags'
import {
  absGain,
  strikes,
  percWithin,
  kelly,
  profitFactor,
  zScore,
  sharpe
} from '@/helpers/calculations'

const Container = styled.div`${styles}`
const Graph = HomeGraph.extend`
height: 30vh;
margin-bottom: var(--pad);

canvas, img {
  height: 30vh !important;
}
`

const Report = ({ loading, user }) => {
  if (loading) {
    return (
      <Container style={{ height: '100vh' }}>
        <ContentLoader height={500} style={{ width: '100%', height: 'auto' }}>
          <rect x='0' y='0' rx='0' ry='0' width='78%' height='200px' />
          <rect x='79%' y='0' rx='0' ry='0' width='25%' height='200px' />
        </ContentLoader>
      </Container>
    )
  }

  const { entries, account: { principle, goal, balance, history } } = user

  const {
    winRate, avgWin,
    largestWin, avgLoss, largestLoss
  } = strikes(entries)

  const acctHistory = (history || '').split(',').slice(1).map(Number)

  return (
    <div className='inner'>
      <Container>
        <section>
          <figure style={{ width: '100%' }}>
            <h2>Growth <Result {...absGain({ principle, balance })} /></h2>

            <Graph>
              <Line
                id='equity'
                datasets={[{ data: acctHistory, borderWidth: 2 }]}
              />
            </Graph>

            <Meta width='auto'>
              <div>Daily: <span>{percWithin(entries, 'day')}%</span></div>
              <div>Weekly: <span>{percWithin(entries, 'week')}%</span></div>
              <div>Monthly: <span>{percWithin(entries, 'month')}%</span></div>
              <div>Highest: <span>{Math.max(...acctHistory)}</span></div>
              <div>Lowest: <span>{Math.min(...acctHistory)}</span></div>
            </Meta>
          </figure>

          <figure className='stat'>
            <h2>Win Rate</h2>

            <Circle
              id='winrate'
              perc={winRate}
              from='#800000'
              to='#E37428'
            />

            <Meta>
              <div>Avg Win: <span>{(avgWin || 0).toFixed(2) || '-'}</span></div>
              <div>Largest win: <span>{(largestWin || 0).toFixed(2) || '-'}</span></div>
              <div>Avg Loss: <span>{(avgLoss || 0).toFixed(2) || '-'}</span></div>
              <div>Largest loss: <span>{(largestLoss || 0).toFixed(2) || '-'}</span></div>
            </Meta>
          </figure>
        </section>

        <section>
          <figure className='stat flex'>
            <div>
              <h2>Kelly</h2>

              <Circle
                id='expectancy'
                perc={kelly(entries)}
                from='#D5D9EA'
                to='#497AF3'
              />
            </div>

            <div>
              <h2>Sharpe Ratio</h2>
              <strong>{sharpe(entries, goal)}</strong>
            </div>

            <div>
              <h2>Profit Factor</h2>
              <strong>{profitFactor(entries)}</strong>
            </div>

            <div>
              <h2>Z-Score</h2>

              <Circle
                id='zscore'
                perc={zScore(entries)}
                color='#6d4cc1'
                noPerc
                hideLines
              />
            </div>
          </figure>

          <div>
            <Tags entries={entries} />
          </div>
        </section>

        <section>
          <figure>
            <h2>Risk of Ruin</h2>
            <RoR entries={entries} balance={balance} />
          </figure>
        </section>
      </Container>
    </div>
  )
}

export default graphql(GET_ACCOUNT, {
  props: ({ data: { loading, user } }) => ({ loading, user })
})(Report)
