import styled from 'styled-components'
import styles from './styles.scss'
import { Link } from '@/routes'
import IconHome from '../../../static/img/icon-home.svg'
import IconBook from '../../../static/img/icon-book.svg'
import IconBar from '../../../static/img/icon-bar.svg'
import IconLabs from '../../../static/img/icon-labs.svg'

const Nav = styled.nav`${styles}`

export default ({ url }) => (
  <Nav>
    <Link href='/'>
      <a className={!url.query.slug ? 'active' : ''}>
        <IconHome className='icon-home' />
        Overview
      </a>
    </Link>

    <Link route='main' params={{ slug: 'journal' }}>
      <a className={/journal/.test(url.query.slug) ? 'active' : ''}>
        <IconBook className='icon-book' />
        Journal
      </a>
    </Link>

    <Link route='main' params={{ slug: 'report' }}>
      <a className={/report/.test(url.query.slug) ? 'active' : ''}>
        <IconBar className='icon-bar' />
        Full Report
      </a>
    </Link>

    <Link route='main' params={{ slug: 'simulator' }}>
      <a className={/simulator/.test(url.query.slug) ? 'active' : ''}>
        <IconLabs className='icon-labs' />
        Simulator
      </a>
    </Link>
  </Nav>
)
