import styled from 'styled-components'
import { styles } from './input'

export const Select = styled.select`
${styles}
cursor: pointer;
padding: 5px 8px;
`

export default props => (
  <Select {...props}>
    {props.children}
  </Select>
)
