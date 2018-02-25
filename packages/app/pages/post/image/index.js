import styled from 'styled-components'

const { API } = process.env
const Figure = styled.figure`
width: 33.33%;

img {
  cursor: pointer;
  display: block;
  vertical-align: top;
}
`

export default ({ id }) => (
  <Figure id='post-img' className='hide-for-small'>
    <img
      src={`${API}/img/${id}?size=980`}
      onClick={({ currentTarget }) => {
        window.dispatchEvent(new window.CustomEvent('open-lbox', {
          detail: { img: currentTarget.src, autoclose: false }
        }))
      }}
    />
  </Figure>
)
