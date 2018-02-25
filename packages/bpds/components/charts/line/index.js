import { Component } from 'react'
import styled from 'styled-components'
import Chart from 'chart.js'
import { getGradient } from '../utils'

const Container = styled.div`
.animate-out & {
  animation: fadeOutDownSlight .3s ease-in-out forwards;
}
`

export default class Line extends Component {
  constructor (props) {
    super(props)
    this.state = { el: <canvas /> }
  }

  componentDidMount () {
    const ctx = this.el.children[0].getContext('2d')
    const datasets = this.props.datasets.map(set => {
      return Object.assign({}, {
        data: [],
        label: 'Data',
        borderColor: '#0F9D58',
        borderWidth: 2,
        pointBorderWidth: 3,
        pointHoverRadius: 9,
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        fill: true,
        backgroundColor: getGradient('rgba(15, 159, 90, 0)', 'rgba(15, 159, 90, 0.1)', this.el.clientHeight)
      }, set)
    })

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array(this.props.datasets[0].data.length),
        datasets
      },
      options: Object.assign({}, {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          tooltips: this.props.tooltips,
          display: this.props.showLegend
        },
        animation: {
          onComplete: () => {
            this.setState({
              el: <img src={this.chart.toBase64Image()} alt='' />
            })

            this.chart.destroy()
          }
        },
        scales: {
          xAxes: [{
            display: false,
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: false,
              fontColor: 'rgba(0, 0, 0, .3)',
              padding: window.innerWidth > 767 ? -50 : 0,
              mirror: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        }
      }, this.props.options)
    })
  }

  componentWillUnmount () {
    if (this.chart) {
      this.chart.destroy()
    }
  }

  render () {
    return <Container innerRef={c => (this.el = c)}>{this.state.el}</Container>
  }
}
