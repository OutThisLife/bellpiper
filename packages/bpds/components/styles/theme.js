import { css } from 'styled-components'
import { responsiveValue } from './mixins'

export const pad = 30

export const colours = {
  default: 'rgb(12,12,12)',
  brand: 'rgb(15, 157, 88)',
  secondary: 'rgb(73, 122, 243)',
  error: 'rgb(172,0,4)',
  gray: 'rgb(155, 162, 179)',
  bg: 'rgb(245, 246, 250)'
}

export const font = {
  family: 'SF Pro Display, sans-serif',
  headings: 'Georgia, serif',
  sizes: {
    default: responsiveValue({ min: 14, max: 16 }),
    small: responsiveValue({ min: 9, max: 11 })
  }
}
