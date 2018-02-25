import { PureComponent } from 'react'
import styled from 'styled-components'
import styles from './styles.scss'

const A = styled.a`${styles}`

export default class MobileMenu extends PureComponent {
  componentDidMount () {
    this.onClose = this.close.bind(this)

    this.$sidebar = document.querySelector('aside')

    if (this.$sidebar) {
      this.$container = this.$sidebar.nextElementSibling

      if (this.$container) {
        this.$container.addEventListener('click', this.onClose)
      }
    }
  }

  componentWillUnmount () {
    if (this.$container) {
      this.$container.removeEventListener('click', this.onClose)
    }
  }

  componentDidUpdate () {
    this.close()
  }

  handleClick () {
    this.el.classList.toggle('open')

    if (this.$sidebar) {
      this.$sidebar.classList.toggle('open')
    }
  }

  close () {
    this.el.classList.remove('open')

    if (this.$sidebar) {
      this.$sidebar.classList.remove('open')
    }
  }

  render () {
    return (
      <A
        href='javascript:;'
        innerRef={c => (this.el = c)}
        onClick={this.handleClick.bind(this)}
      >
        <span />
      </A>
    )
  }
}
