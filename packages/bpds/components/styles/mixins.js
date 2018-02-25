import { css } from 'styled-components'

const scaleDefaults = {
  property: '',
  min: 12,
  max: 21,
  small: 400,
  large: 2000
}

export const responsiveValue = options => {
  const {
    property,
    min, max,
    small, large
  } = {
    ...scaleDefaults,
    ...options
  }

  const prop = property ? `${property}: ` : 'font-size: '

  return css`
  ${prop}${min}px;

  @media (min-width: ${small}px) {
    ${prop}calc(${min}px + (${max} - ${min}) * (100vw - ${small}px) / (${large} - ${small}));

    @media (max-height: 1090px) {
      ${prop}calc(${min}px + (${max} - ${min}) * (100vmin - ${small}px) / (${large} - ${small}));
    }
  }

  @media (min-width: ${large}px) {
    ${prop}${max}px;
  }
  `
}
