import { PureComponent } from 'react'
import styles from './styles.scss'
import { Toolbar } from '@/components/toolbar'
import Form from '@/components/common/form'
import Input from '@/components/common/input'
import Select from '@/components/common/select'
import { Button } from '@/components/common/button'
import Loader from '../../../static/img/loader.svg'

const ControlStyles = Toolbar.extend`
${styles}

@media (max-width: 767px) {
  padding: 0;

  .group {
    padding: calc(var(--pad) / 2) 0;

    > *:first-child {
      padding: 0 calc(var(--pad) / 2);
    }
  }
}
`

export default class Controls extends PureComponent {
  handleSubmit ({ currentTarget }) {
    currentTarget.classList.add('loading')

    const data = {}
    for (const [key, value] of new window.FormData(currentTarget)) {
      data[key] = parseFloat(value)
    }

    this.props.generator(data)

    window.requestAnimationFrame(() => {
      currentTarget.classList.remove('loading')
    })
  }

  render () {
    return (
      <ControlStyles innerRef={c => (this.el = c)}>
        <Form action='javascript:;' className='group' onSubmit={this.handleSubmit.bind(this)}>
          <nav>
            <label>
              Starting Equity

              <Input
                name='start'
                type='text'
                defaultValue={200}
                maxLength={8}
                required
              />
            </label>

            <label>
              Win Rate

              <Input
                name='winrate'
                type='text'
                defaultValue={50}
                maxLength={3}
                required
              />
              <span>%</span>
            </label>

            <label>
              W/L Ratio

              <Input
                name='reward'
                type='text'
                defaultValue={1}
                maxLength={3}
                required
              />
              <span>:1</span>
            </label>

            <label>
              Avg. Risk

              <Input
                name='risk'
                type='text'
                defaultValue={1}
                maxLength={3}
                required
              />
              <span>%</span>
            </label>

            <Select name='lines' required>
              <option value=''>Lines</option>
              <option>7</option>
              <option>14</option>
              <option>21</option>
              <option>28</option>
              <option>35</option>
            </Select>

            <Select name='size' required>
              <option value=''>Sample Size</option>
              <option>100</option>
              <option>300</option>
              <option>500</option>
              <option>700</option>
              <option>900</option>
            </Select>

            <Button primary type='submit'>
              Start <Loader />
            </Button>
          </nav>
        </Form>
      </ControlStyles>
    )
  }
}
