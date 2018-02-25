import React from 'react'
import styled from 'styled-components'
import { colours } from '../styles/theme'

export const A = styled.a`
cursor: pointer;
display: inline-block;
vertical-align: middle;
font-weight: 700;
font-size: 12px;
font-family: var(--font);
text-decoration: none;
padding: 8px 13px;
border-radius: 3px;
border: 1px solid;

&:focus, &:active {
  outline: none;
}

&:hover {
  text-decoration: underline;
}

+ [class^="button"] {
  margin-left: 10px;
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

${props => themes[props.theme || 'default']}

${props => props.icon && `
padding: 5px;
border-color: transparent;
background: transparent;

&:hover {
  color: ${colours.default};
  border-color: ${colours.gray};
}

&:active {
  color: ${colours.secondary};
  border-color: ${colours.secondary};
}

svg {
  margin: 0;
}
`}
`

const themes = {
  default: `
    color: initial;
    border-color: ${colours.gray};
    &:hover {
      color: ${colours.secondary};
      border-color: ${colours.secondary};
      background: transparent;
    }
  `,

  primary: `
    color: #FFF;
    border-color: ${colours.secondary};
    background: ${colours.secondary};

    &:hover {
      color: ${colours.secondary};
      background: transparent;
    }
  `,

  ghost: `
    color: ${colours.secondary};
    border-color: ${colours.secondary};
    background: transparent;

    &:hover {
      color: #FFF;
      background: ${colours.secondary};
    }
  `
}

export const Button = A.withComponent('button')

export default props => (
  <A {...props}>
    {props.children || props.title}
  </A>
)
