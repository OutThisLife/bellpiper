import React from 'react'
import styled from 'styled-components'
import { responsiveValue } from '../styles/mixins'

const H1 = styled.h1`${responsiveValue({ min: 45, max: 50 })}`

export default props => <H1>{props.children}</H1>
