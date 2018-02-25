import { Component } from 'react'
import _ from 'lodash'
import styles from './styles.scss'
import Controls from './controls'
import { Container, Graph as HomeGraph } from '@/pages/home'
import Line from '@/components/charts/line'
import { getGradient, randomRGB } from '@/components/charts/utils'

const Inner = Container.extend`${styles}`

export const Graph = HomeGraph.extend`
@media (min-width:  767px) {
  width: calc(100% + 40px);
  margin-left: -40px;
  height: calc(100vh - 200px);

  img, canvas {
    height: calc(100vh - 250px);
  }
}

@media (max-width: 767px) {
  align-self: center;

  > div {
    height: 40vh;
  }
}
`

export default class Simulator extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    window.requestAnimationFrame(() => {
      this.generate({
        start: 200,
        winrate: 50,
        reward: 1,
        risk: 1,
        lines: 21,
        size: 500
      })
    })
  }

  generate ({ start, winrate, reward, size, lines, risk }) {
    const datasets = [...Array(lines).keys()].map(i => {
      const colour = randomRGB()
      let tilt = 1
      let last = 0

      const data = (y => [...Array(size).keys()].map(s => {
        const r = Math.random() * 100 < winrate / tilt ? reward : -1

        if (last === r) {
          if (r === -1) {
            tilt = 1.05
          } else if (r === reward) {
            tilt = 0.99
          }
        } else {
          tilt = 1
        }

        last = r
        return Math.min(100000000000, (y += r * (y * (risk / 100))))
      }))(start)

      return {
        data,
        fill: false,
        label: '',
        pointRadius: 0,
        borderWidth: 1,
        borderColor: `rgb(${colour})`
      }
    })

    datasets.push((() => {
      const data = [...Array(size).keys()].map(i => {
        return _.meanBy(datasets, ({ data }) => data[i])
      })

      const border = window.getComputedStyle(document.documentElement).getPropertyValue('--default')

      return {
        data,
        zIndex: -1,
        label: 'Avg',
        fill: true,
        pointRadius: 0,
        borderWidth: 3,
        backgroundColor: getGradient('rgba(15, 159, 90, 0)', 'rgba(15, 159, 90, 0.1)', 800),
        borderColor: `rgb(${border})`
      }
    })())

    const end = datasets[datasets.length - 1].data[size - 1]

    this.setState({
      perf: Math.round((1 - (start / end)) * 100),
      graph: <Line key={+new Date()} datasets={datasets} showLegend />
    })
  }

  render () {
    return (
      <div>
        <Controls generator={this.generate.bind(this)} />

        <Inner className='inner' ref={c => (this.el = c)}>
          <p className='hide-for-small'>
            Each &#8216;account&#8217; will randomly process trades per the criteria set
          </p>

          <Graph>
            {this.state.graph || null}
          </Graph>
        </Inner>
      </div>
    )
  }
}
