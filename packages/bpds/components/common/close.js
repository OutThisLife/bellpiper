import styled from 'styled-components'

const Close = styled.span`
cursor: pointer;
display: inline-block;
position: relative;
overflow: hidden;
width: ${props => props.width || '50px'};
height: ${props => props.height || '50px'};
text-align: center;
transition: .3s ease-in-out;

&:not(:hover) {
  opacity: .3;
}

&:before, &:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  transition: inherit;
  background: ${props => props.bg || 'rgb(var(--default))'};
}

&:before {
  transform: rotate(45deg);
}

&:after {
  transform: rotate(-45deg);
}
`

export default props => <Close className='close' {...props} />
