import styled from 'styled-components'
import styles from './styles.scss'
import { strikes, riskOfRuin } from '@/helpers/calculations'

const RoR = styled.div`${styles}`

export default ({ entries, balance }) => {
  const { winRate, lossRate, avgLoss } = strikes(entries)
  const tests = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10]

  return (
    <RoR>
      <div>
        {tests.map(n => (
          <span key={`ls-${n}`}>
            {n}%
          </span>
        ))}
      </div>

      <div>
        {tests.map(n => (
          <span key={`pl-${n}`}>
            &lt;{riskOfRuin(winRate, lossRate, n)}%
          </span>
        ))}
      </div>

      <div>
        {tests.map(n => (
          <span key={`clt-${n}`}>
            {Math.floor((balance * (n / 100)) / Math.abs(avgLoss)) || 0}
          </span>
        ))}
      </div>
    </RoR>
  )
}
