import styled from 'styled-components'
import styles from './styles.scss'

export const Toolbar = styled.div`${styles}`

export default ({ children }) => (
  <Toolbar className='toolbar'>
    {children}
  </Toolbar>
)
