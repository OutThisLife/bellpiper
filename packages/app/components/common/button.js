import styled from 'styled-components'
import Link from 'next/link'

export const styles = `
cursor: pointer;
display: inline-block;
vertical-align: middle;
color: inherit;
font-weight: 700;
font-size: 12px;
font-family: var(--font);
padding: 8px 13px;
border-radius: 3px;
border: 1px solid rgb(var(--gray));
transition: .3s ease-in-out;
background: linear-gradient(to bottom, rgba(var(--header-bg), .5), rgba(var(--header-bg), .7));

&:focus, &:active {
  outline: none;
}

&:hover {
  color: rgb(var(--secondary));
  border-color: rgb(var(--secondary));
  background: transparent;
}

svg {
  display: inline-block;
  vertical-align: middle;
  width: 12px;
  fill: currentColor;
  margin: 0 5px 0 0;

  path {
    fill: currentColor;
  }
}
`

export const A = styled.a`
${styles}

${props => props.primary ? `
color: #FFF;
border-color: rgb(var(--secondary));
background: rgb(var(--secondary));

&:hover {
  color: rgb(var(--secondary));
  background: transparent;
}
` : ''}

${props => props.icon ? `
padding: 5px;
border-color: transparent;
background: transparent;

&:hover {
  color: rgb(var(--default));
  border-color: rgb(var(--gray));
  background: linear-gradient(to bottom, rgba(var(--header-bg), .5), rgba(var(--header-bg), .7));
}

&:active {
  color: rgb(var(--secondary));
  border-color: rgb(var(--secondary));
}

svg {
  margin: 0;
}
` : ''}
`

export const Button = A.withComponent('button')

export default props => (
  <Link href={props.href}>
    <A {...props}>
      {props.children || props.title}
    </A>
  </Link>
)
