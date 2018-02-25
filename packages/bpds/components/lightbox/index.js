import { Component } from 'react'
import styled from 'styled-components'
import styles from './styles.scss'
import giphy from '@/components/common/giphy'
import Close from '@/components/common/close'

const Container = styled.div`${styles}`

export default class Lightbox extends Component {
  constructor (props) {
    super(props)
    this.state = { img: false }
  }

  componentDidMount () {
    this.tm = null
    this.onOpen = this.handleOpen.bind(this)
    this.onKeyDown = this.handleKeyDown.bind(this)

    window.addEventListener('open-lbox', this.onOpen)
    window.addEventListener('keydown', this.onKeyDown)
  }

  componentDidUpdate () {
    clearTimeout(this.tm)

    if (this.state.autoclose) {
      window.requestAnimationFrame(() => {
        this.tm = setTimeout(this.handleClose.bind(this), 2500)
      })
    }
  }

  componentWillUnmount () {
    if (this.el) {
      this.handleClose()
    }

    window.removeEventListener('open-lbox', this.onOpen)
    window.removeEventListener('keydown', this.onKeyDown)
  }

  handleOpen ({ detail }) {
    document.body.classList.add('lbox-open')
    const $img = new window.Image()

    if (!detail.q) {
      this.setState(detail)
    } else {
      giphy.search({ ...detail }, (err, res) => {
        if (err) {
          console.error('GIPHY:', err)
        } else {
          const { data } = res
          $img.src = data[Math.floor(Math.random() * data.length)].images.downsized_medium.url
          $img.onload = () => this.setState({ img: $img.src, autoclose: true })
        }
      })
    }
  }

  handleClose () {
    document.body.classList.remove('lbox-open')

    if (this.el) {
      this.el.classList.add('out')
    }

    setTimeout(() => {
      this.setState({ img: false })
    }, 300)
  }

  handleKeyDown ({ keyCode }) {
    if (
      this.state.img &&
      ~[27, 88, 67].indexOf(keyCode)
    ) {
      window.requestAnimationFrame(this.handleClose.bind(this))
    }
  }

  render () {
    if (!this.state.img) {
      return null
    }

    return (
      <Container innerRef={c => (this.el = c)}>
        <a href='javascript:;' onClick={this.handleClose.bind(this)} />

        <section>
          <Close
            onClick={this.handleClose.bind(this)}
            width='30px'
            height='30px'
          />

          <img src={this.state.img} />
        </section>
      </Container>
    )
  }
}
