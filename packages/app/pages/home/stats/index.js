import styled from 'styled-components'
import styles from './styles.scss'
import Circle from '@/components/charts/circle'
import { A } from '@/components/common/button'
import Result from '@/components/common/result'
import { absGain, percWithin, strikes, zScore } from '@/helpers/calculations'

const Container = styled.section`${styles}`

export default ({ entries, account }) => (
  <Container>
    <div>
      <h2>Abs. Gain</h2>
      <Result {...absGain(account)} />

      <hr />

      <div className='grouped'>
        <div>
          <h2>Monthly</h2>

          <Result
            result={false}
            change={percWithin(entries, 'isoMonth')}
          />
        </div>

        <div>
          <h2>Weekly</h2>

          <Result
            result={false}
            change={percWithin(entries, 'isoWeek')}
          />
        </div>
      </div>
    </div>

    <div>
      <h2>Total Trades</h2>

      <strong style={{
        display: 'block',
        marginBottom: '15px'
      }}>
        {entries.length}
      </strong>

      <A href='javascript:;' onClick={() => {
        window.dispatchEvent(new window.CustomEvent('open-add-entry'))
      }}>
        Add Trade
      </A>
    </div>

    <div>
      <h2>Profitability</h2>

      <Circle
        id='profitability'
        perc={strikes(entries).winRate || 0}
        from='#800000'
        to='#E37428'
        strict
      />
    </div>

    <div>
      <h2>Z-Score</h2>

      <Circle
        id='zscore'
        perc={zScore(entries)}
        color='#6d4cc1'
        hideLines
      />
    </div>
  </Container>
)
