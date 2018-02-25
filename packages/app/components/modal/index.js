import styled, { injectGlobal } from 'styled-components'
import styles from './styles.scss'
import globals from './global.scss'
import Close from '@/components/common/close'

injectGlobal`${globals}`
export const Modal = styled.div`${styles}`

export default ({ id, onClick, title, children }) => (
  <Modal id={id}>
    <a href='javascript:;' onClick={onClick.bind(this)} />

    <section>
      <header>
        <h2>{title || 'Modal Title'}</h2>
        <Close
          onClick={onClick.bind(this)}
          width='30px'
          height='30px'
          bg='#FFF'
        />
      </header>

      <div className='inner'>{children}</div>
    </section>
  </Modal>
)
