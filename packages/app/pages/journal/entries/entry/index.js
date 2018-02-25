import styled from 'styled-components'
import styles from './styles.scss'
import dummyStyles from './dummy.scss'
import Tags from '@/components/common/tags'
import Result from '@/components/common/result'

const { API } = process.env
const Figure = styled.figure`${styles}`

export const Entry = ({ id, title, desc, image, tags, result, change, onClick }) => (
  <Figure className={!result ? 'open' : 'closed'} onClick={onClick.bind(this, id)}>
    <div className='image'>
      {image && image.id !== 0 && <img src={`${API}/img/${image.id}?size=300`} />}
      {change ? (
        <div className='status'>
          <span>
            <b>Closed for</b><br />
            <Result result={result} change={change} />
          </span>
        </div>
      ) : ''}
    </div>

    <figcaption>
      <h4>{title}</h4>
      <p>{desc}</p>
      {tags && <Tags list={tags} />}
    </figcaption>
  </Figure>
)

const Outline = Figure.extend`${dummyStyles}`

export const Dummy = () => (
  <Outline
    className='dummy'
    onClick={() => {
      window.dispatchEvent(new window.CustomEvent('open-add-entry'))
    }}
  />
)
