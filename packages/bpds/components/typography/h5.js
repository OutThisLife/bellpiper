import React from 'react'
import styled from 'styled-components'
import { responsiveValue } from '../styles/mixins'
import { colours } from '../styles/theme'

const H4 = styled.h4`
color: ${colours.gray};
${responsiveValue({ min: 13, max: 16 })}
text-transform: uppercase;
`

export default props => <H4>{props.children}</H4>
