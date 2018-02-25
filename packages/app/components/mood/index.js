import emojione from 'emojione'
import styled from 'styled-components'
import Option from '@/components/common/option'

const Mood = styled.div`
display: flex;
align-items: center;
text-align: center;
justify-content: space-around;
margin: calc(var(--pad) / 2) auto;

label {
  padding: 0 10px;

  span {
    display: block;
    margin: 0 auto 5px;
  }
}

em:after {
  display: none !important;
}
`

const moods = [':weary:', ':relieved:', ':wink:', ':sunglasses:']

export default () => (
  <Mood>
    {moods.map(m => (
      <Option
        key={`mood-${m}`}
        name='mood'
        value={m}
        checked={m === moods[2]}
        label={<i dangerouslySetInnerHTML={{ __html: emojione.toImage(m) }} />}
      />
    ))}
  </Mood>
)
