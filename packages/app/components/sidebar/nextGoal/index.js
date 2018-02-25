import { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { UPDATE_ACCOUNT } from '@/lib/queries'
import styled from 'styled-components'
import styles from './styles.scss'
import { Link } from '@/routes'
import Circle from '@/components/charts/circle'
import motivate from './motivate'

const Container = styled.section`${styles}`

class NextGoal extends PureComponent {
  componentDidMount () {
    this.checkLevel()
  }

  shouldComponentUpdate ({ principle, goal }) {
    return (
      principle === this.props.principle &&
      goal === this.props.goal
    )
  }

  componentDidUpdate () {
    this.checkLevel()
  }

  checkLevel () {
    const { principle, balance, bracket, lastBracket } = this.props

    if (balance >= bracket) {
      this.handleLevelChange('congratulations')
    } else if (balance < principle || balance < lastBracket) {
      this.handleLevelChange('oh no')
    }
  }

  handleLevelChange (q) {
    const { principle, balance } = this.props

    window.dispatchEvent(new window.CustomEvent('open-lbox', {
      detail: { q }
    }))

    const input = {
      bracket: parseInt(Math.max(this.compound(principle), this.compound(balance))),
      lastBracket: balance
    }

    this.props.mutate({
      variables: { input }
    })
  }

  compound (n) {
    return n + (n * (this.props.goal / 100))
  }

  render () {
    const { lastBracket, bracket, principle, balance } = this.props
    const perc = (balance - lastBracket) / (bracket - lastBracket)

    return (
      <Container>
        <h3>
          Current bracket <br />

          <Link route='main' params={{ slug: 'journal' }}>
            <a>{balance < principle ? balance : lastBracket} &rarr; {bracket}</a>
          </Link>
        </h3>

        <div>
          <Circle
            id='nextGoal'
            perc={perc * 100}
            from='#7FB2F0'
            to='#F0AD1E'
            listen={bracket}
            strict
          />

          <h2>
            <em>{motivate(perc)}</em>
          </h2>
        </div>
      </Container>
    )
  }
}

export default graphql(UPDATE_ACCOUNT)(NextGoal)
