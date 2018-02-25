import React from 'react'
import styled from 'styled-components'
import { responsiveValue } from '../styles/mixins'

const H3 = styled.h3`${responsiveValue({ min: 28, max: 32 })}`

export default props => <H3>{props.children}</H3>
