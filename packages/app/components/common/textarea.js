import styled from 'styled-components'
import { styles } from './input'

const Textarea = styled.textarea`
${styles}

resize: vertical;
min-height: 150px;
max-height: 350px;
`

export default props => <Textarea {...props} />
