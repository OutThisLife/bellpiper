import { PureComponent } from 'react'
import emojione from 'emojione'
import styled from 'styled-components'
import styles from './styles.scss'
import Close from '@/components/common/close'
import dateFormat from '@/helpers/dateFormat'
import AddUpdate from './addUpdate'
import Updates from './updates'
import Image from './image'

const Article = styled.article`${styles}`

export default class Post extends PureComponent {
  componentDidMount () {
    this.onOpen = this.handleOpen.bind(this)
    this.onClose = this.handleClose.bind(this)
    this.onKeyDown = this.handleKeyDown.bind(this)

    if (this.$post) {
      this.$brackets = this.$post.previousElementSibling
      this.$controls = this.$brackets.previousElementSibling
    }

    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('open-post', this.onOpen)
    window.addEventListener('close-post', this.onClose)
  }

  componentWillUnmount () {
    this.handleClose()
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('open-post', this.onOpen)
    window.removeEventListener('close-post', this.onClose)
  }

  handleOpen ({ detail }) {
    if (!this.$post) {
      return
    }

    document.body.classList.add('entry-open')

    this.$post.classList.remove('fade-in')
    this.$post.classList.remove('animate-in')
    this.$post.classList.remove('animate-out')

    const {
      offsetLeft, offsetTop,
      clientWidth, clientHeight
    } = detail.el

    const t = offsetTop
    const r = offsetLeft + clientWidth - 26
    const b = clientHeight + 4
    const l = offsetLeft - 30
    const clip = `rect(0px, ${r}px, ${b}px, ${l}px)`

    this.$post.style.top = `${t}px`
    this.$post.style.clip = clip
    this.$post.dataset.origClip = clip

    window.requestAnimationFrame(() => {
      this.$post.classList.add('fade-in')
      this.$brackets.classList.add('animate-out')

      window.requestAnimationFrame(() => {
        const { width, height } = this.$post.getBoundingClientRect()

        this.$post.style.clip = `rect(0px, ${width * 1.5}px, ${height * 1.5}px, 0px)`
        this.$post.classList.add('animate-in')
        this.$controls.classList.add('show-next')
      })
    })
  }

  handleClose () {
    if (!this.$post) {
      return
    }

    document.body.classList.remove('entry-open')

    this.$brackets.classList.remove('animate-out')
    this.$controls.classList.remove('show-next')

    this.$post.style.clip = this.$post.dataset.origClip
    this.$post.classList.add('animate-out')
  }

  handleKeyDown ({ keyCode }) {
    if (
      document.body.classList.contains('entry-open') &&
      !document.body.classList.contains('lbox-open') &&
      ~[27, 67].indexOf(keyCode)
    ) {
      window.requestAnimationFrame(this.handleClose.bind(this))
    }
  }

  render () {
    if (!this.props.id) {
      return null
    }

    const {
      id, title, mood,
      change, image, createdAt
    } = this.props

    return (
      <Article innerRef={c => (this.$post = c)}>
        <Close onClick={this.handleClose.bind(this)} />

        {image && image.id !== 0 && <Image {...image} />}

        <aside>
          <header>
            <h1>{title}</h1>

            <em>
                posted on {dateFormat(createdAt)}
                &nbsp;while <i dangerouslySetInnerHTML={{ __html: emojione.toImage(mood || '') }} />
            </em>
          </header>

          <section>
            {!change && <AddUpdate entryId={id} />}
            <Updates entryId={id} />
          </section>
        </aside>
      </Article>
    )
  }
}
