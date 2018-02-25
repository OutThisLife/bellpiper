import styled from 'styled-components'

export const styles = `
display: block;
width: 100%;
color: rgb(var(--default));
font-size: 12px;
font-family: var(--font);
border: 1px solid rgba(var(--gray), .35);
border-radius: 3px;
box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
transition: .3s ease-in-out;
background: rgb(var(--header-bg));

&:focus, &:active {
  outline: none;
  border-color: rgba(var(--secondary), .5);
  box-shadow: inset 0 1px 2px rgba(27,31,35,0.075), 0 5px 10px 0 rgba(0,0,0,.15);
}

&:hover {
  border-color: rgba(var(--gray), .8);
}

&[readonly] {
  border-style: dashed;
}

&::-webkit-input-placeholder {
  color: rgba(var(--gray), .8);
}
`

export const Input = styled.input`
${styles}
padding: ${props => props.cozy ? '12px 16px' : '6px 8px'};
`

export default props => <Input {...props} />
