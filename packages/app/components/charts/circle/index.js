import { PureComponent } from 'react'
import styled from 'styled-components'
import ProgressBar from 'progressbar.js'

const Div = styled.div`
width: 100%;
height: auto;
white-space: nowrap;
`

export default class Circle extends PureComponent {
  componentDidMount () {
    this.pb = new ProgressBar.Circle(`#circle-${this.props.id}`, {
      color: this.props.color || '#000080',
      trailColor: 'rgba(0, 0, 0, .1)',
      strokeWidth: this.props.hideLines ? 0 : 3,
      trailWidth: this.props.hideLines ? 0.5 : 1,
      duration: 1200,
      easing: 'easeInOut',
      text: {
        value: '',
        alignToBottom: false
      },
      from: {
        color: this.props.from || this.props.color || '#000080'
      },
      to: {
        color: this.props.to || this.props.color || '#000080'
      },
      step: (state, bar) => {
        const value = Math.round(bar.value() * 100)

        bar.setText(`${value}${this.props.noPerc ? '' : '%'}` || '')
        bar.path.setAttribute('stroke', state.color)
        bar.text.style.color = state.color
      }
    })

    if (this.props.strict) {
      this.pb.animate(Math.min(100, Math.abs(this.props.perc)) / 100)
    } else {
      this.pb.animate(this.props.perc / 100)
    }
  }

  componentDidUpdate ({ listen }) {
    const doAnim = () => this.pb.animate(Math.min(100, Math.abs(this.props.perc)) / 100)

    if (listen && listen !== this.props.listen) {
      if (listen > this.props.listen) {
        this.pb.animate(0, false, doAnim)
      } else if (listen < this.props.listen) {
        this.pb.animate(1, false, doAnim)
      }
    } else {
      doAnim()
    }
  }

  componentWillUnmount () {
    if (this.pb) {
      this.pb.destroy()
    }
  }

  render () {
    return <Div id={`circle-${this.props.id}`} />
  }
}
