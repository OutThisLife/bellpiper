import { Component } from 'react'
import styled from 'styled-components'
import styles from './styles.scss'
import Form from '@/components/common/form'
import Input from '@/components/common/input'
import Option from '@/components/common/option'
import { Button } from '@/components/common/button'

const { API } = process.env
const plans = {
  30: 9.99,
  365: 107.89
}

const Container = styled.div`${styles}`

export default class Pay extends Component {
  constructor (props) {
    super(props)

    this.state = {
      days: 30,
      amount: plans[30]
    }
  }

  handleChange ({ currentTarget }) {
    const days = parseInt(currentTarget.value)
    const amount = plans[days]

    this.setState({ days, amount })
  }

  render () {
    return (
      <Container {...this.props}>
        <div className='inner'>
          <hgroup>
            <h1>A payment plan is necessary to continue</h1>
          </hgroup>

          <Form
            key='idk'
            action={`${API}/checkout`}
            method='post'
          >
            <h3>How much would you like to pay?</h3>

            <Option
              checked
              type='radio'
              name='days'
              value={30}
              label={`Monthly: $${plans[30]} per month`}
              onClick={this.handleChange.bind(this)}
            />

            <Option
              type='radio'
              name='days'
              value={365}
              label={`Yearly: $${plans[365]} once a year (-10%)`}
              onClick={this.handleChange.bind(this)}
            />

            <hr />

            <h3>Please enter your card details</h3>

            <div className='row stacked'>
              <label type>
                Credit Card Number

                <Input
                  cozy
                  placeholder='**** **** **** 9581'
                  name='cc'
                  type='text'
                  style={{
                    paddingRight: '135px',
                    background: `url(/static/img/cards.png) calc(100% - 8px) center no-repeat`,
                    backgroundSize: '120px auto'
                  }}
                />
              </label>
            </div>

            <div className='row'>
              <label type>
                Expiration (MM/YY)

                <Input
                  cozy
                  placeholder='05/21'
                  type='text'
                  name='exp'
                />
              </label>

              <label type>
                Zip/postal code

                <Input
                  cozy
                  placeholder='78666'
                  type='text'
                  name='zip'
                />
              </label>
            </div>

            <hr />

            <p>
              Click below to charge your card&nbsp;
              <strong>${this.state.amount}</strong>
              &nbsp;now and then every {this.state.days} days thereafter.
              You may cancel at any time.
            </p>

            <Button primary type='submit'>
              Charge my card ${this.state.amount}
            </Button>
          </Form>

          <footer>Your credit card information is never stored on our servers.</footer>
        </div>
      </Container>
    )
  }
}
