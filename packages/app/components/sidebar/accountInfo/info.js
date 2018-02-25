import Input from '@/components/common/input'
import Help from '@/components/help'

export default ({ principle, goal, balance }) => {
  if (!principle) {
    return <div>&hellip;</div>
  }

  return (
    <span>
      <h3>Account Info</h3>

      <div>
        <label>
          Principle:
          <Help copy='What is your starting capital?' />
        </label>

        <Input
          type='text'
          placeholder='300, 1000, ...'
          required
          defaultValue={principle}
        />
      </div>

      <div>
        <label>
          Goal %:
          <Help copy='How much percentage per week/month do you want to make?' />
        </label>

        <Input
          type='text'
          placeholder='10%'
          required
          defaultValue={goal}
        />
      </div>

      <div>
        <label>
          Balance:
          <Help copy='This is the current value of your account' />
        </label>

        <Input type='text' value={balance.toFixed(2)} readOnly />
      </div>
    </span>
  )
}
