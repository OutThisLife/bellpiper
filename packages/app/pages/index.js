import { PureComponent } from 'react'
import fetch from 'isomorphic-fetch'
import { injectGlobal } from 'styled-components'
import { styles } from 'bellpiper'
import withData from '@/lib/withData'
import Templates from './_templates'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Container from '@/components/container'
import AddEntry from '@/pages/journal/addEntry'
import Lightbox from '@/components/lightbox'

injectGlobal`${styles}`

class Index extends PureComponent {
  static async getInitialProps ({ req, res }) {
    if (req) {
      const { API, SITE_URL } = process.env
      const isLoggedIn = (await (await fetch(`${API}/touch`)).status) === 200

      if (!isLoggedIn) {
        return res.redirect(`${SITE_URL}/login?refresh`)
      }
    }

    return { isLoggedIn: true }
  }

  render () {
    const { url } = this.props
    const Tmp = Templates[url.query.slug || '/']

    return (
      <div>
        <Header {...this.props} />

        <AddEntry {...url} />
        <Lightbox />

        <main>
          <Sidebar {...this.props} />

          <Container>
            <Tmp {...this.props} />
          </Container>
        </main>
      </div>
    )
  }
}

export default withData(Index)
