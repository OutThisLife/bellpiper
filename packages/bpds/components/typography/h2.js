import React from 'react'
import styled from 'styled-components'
import { responsiveValue } from '../styles/mixins'

const H2 = styled.h2`${responsiveValue({ min: 33, max: 40 })}`

export default props => <H2>{props.children}</H2>
