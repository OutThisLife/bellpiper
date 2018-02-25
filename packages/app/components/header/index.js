import styled from 'styled-components'
import styles from './styles.scss'
import { Link } from '@/routes'
import Logo from './logo'
import Theme from './theme'
import MobileMenu from './mobileMenu'

const { API } = process.env
const Header = styled.header`${styles}`
const LogoSection = () => (
  <section>
    <Link href='/'>
      <a><Logo /></a>
    </Link>
  </section>
)

export default ({ url }) => {
  return (
    <Header>
      <LogoSection />

      {url && (
        <h1 className='hide-for-small'>
          &nbsp;
          <span className={!url.query.slug ? 'active' : ''}>Dashboard</span>
          <span className={url.query.slug === 'journal' ? 'active' : ''}>Journal</span>
          <span className={url.query.slug === 'report' ? 'active' : ''}>Report</span>
          <span className={url.query.slug === 'sim' ? 'active' : ''}>Simulator</span>
        </h1>
      )}

      <MobileMenu {...url} />

      <nav>
        <Link route='main' params={{ slug: 'pay' }}>
          <a>Billing</a>
        </Link>

        <Theme />

        <a href={`${API}/logout`}>
          Logout
        </a>
      </nav>
    </Header>
  )
}
