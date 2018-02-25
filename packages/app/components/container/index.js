import styled from 'styled-components'
import { Router } from '@/routes'
import styles from './styles.scss'

const speed = 750
let tm = null

Router.onRouteChangeStart = () => {
  clearTimeout(tm)

  const $container = document.querySelector('.container')

  if ($container) {
    const $clone = $container.cloneNode(true)

    document.body.classList.add('loading')
    $clone.classList.add('clone')

    window.requestAnimationFrame(() => {
      $container.parentNode.insertBefore($clone, $container.nextSibling)
      $container.classList.add('animate-in')
      $clone.classList.add('animate-out')

      tm = setTimeout(() => {
        document.body.classList.remove('loading')
        $clone.parentNode.removeChild($clone)

        setTimeout(() => {
          $container.classList.remove('animate-in')
        }, speed)
      }, speed)
    })
  }
}

const Container = styled.div`
${styles}

.inner {
  animation-duration: ${speed / 1000}s;
}
`

export default ({ children }) => <Container className='container'>{children}</Container>
