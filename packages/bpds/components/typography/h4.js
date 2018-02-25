import React from 'react'
import styled from 'styled-components'
import { responsiveValue } from '../styles/mixins'

const H4 = styled.h4`${responsiveValue({ min: 17, max: 20 })}`

export default props => <H4>{props.children}</H4>
