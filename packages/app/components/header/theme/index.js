import { Component } from 'react'

export default class Theme extends Component {
  constructor (props) {
    super(props)
    this.state = { on: true }
  }

  componentDidUpdate () {
    document.body.classList.add('changing-theme')
    setTimeout(() => document.body.classList.remove('changing-theme'), 100)
  }

  handleClick () {
    this.setState({ on: !this.state.on })
  }

  render () {
    return (
      <span>
        <a href='javascript:;' onClick={this.handleClick.bind(this)}>
          Flux
        </a>

        <style dangerouslySetInnerHTML={{ __html: this.state.on ? light : dark }} />
      </span>
    )
  }
}

const light = `
:root {
  --default: 12,12,12;
  --secondary: 73, 122, 243;
  --gray: 155, 162, 179;
  --highlight: 255, 255, 136;

  --header-bg: 255, 255, 255;
  --bg: 245, 246, 250;
}
`

const dark = `
:root {
  --default: 255,255,255;
  --secondary: 227, 36, 89;
  --gray: 43, 77, 117;
  --highlight: 31, 96, 183;;

  --header-bg: 8, 28, 55;
  --bg: 4, 24, 48;
}
`
