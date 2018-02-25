import styled from 'styled-components'

const Meta = styled.div`
display: flex;
flex-wrap: wrap;
align-items: stretch;
justify-content: space-between;
color: rgb(var(--gray));
font-weight: 700;
font-size: 12px;
text-align: left;
margin: 15px auto 0;

div {
  display: inherit;
  width: ${props => props.width || '40%'};
  margin-bottom: -1px;
  padding: ${props => props.width === 'auto' ? '0px' : '15px'} 0;

  span {
    font-weight: 400;
    margin-left: ${props => props.width === 'auto' ? '5px' : 'auto'};
  }
}
`

export default props => <Meta {...props}>{props.children}</Meta>
