import { css } from 'styled-components'
import * as theme from './theme'

export default css`
body, html {
  margin: 0;
  padding: 0;
}

html {
  overflow: auto;
  font-size: ${theme.font.sizes.default};
  font-family: ${theme.font.family};
  overflow-y: scroll;
}

body {
  color: ${theme.colours.default};
  text-rendering: optimizeLegibility;
  font-smoothing: antialised;
  text-size-adjust: 100%;
  background: ${theme.colours.bg};

  &.loading {
    pointer-events: none;
  }

  &.changing-theme * {
    transition: none !important;
  }
}

* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.hide-for-small {
  @media (max-width: 767px) {
    display: none !important;
  }
}

.show-for-small {
  display: none !important;

  @media (max-width: 767px) {
    display: block !important;
  }
}

.invisible {
  visibility: hidden;
}

.center-align {
  text-align: center;
}

.green, .success {
  color: ${theme.colours.brand};
}

.red, .error {
  color: ${theme.colours.error};
}

*::selection {
  color: #FFF;
  background: hotpink;
}

.styled-scrollbar::-webkit-scrollbar {
  width: 2px;
  background: rgba(155,162,179, .5);
}

.styled-scrollbar::-webkit-scrollbar-thumb {
  cursor: pointer;
  background: ${theme.colours.secondary};
}

// -----------------------------------------------

figure {
  margin: 0;
}

img, svg, embed, object, iframe {
  max-width: 100%;
  height: auto;
}

img.emojione {
  display: inline-block;
  vertical-align: middle;
}

a {
  color: ${theme.colours.default};
  text-decoration: underline;
  text-decoration-color: ${theme.colours.gray};

  &:hover {
    color: ${theme.colours.secondary};
  }
}

hr {
  clear: both;
  margin: ${theme.pad} auto;
  border: 0;
  border-top: 1px solid rgba(155, 162, 179, .3);
  background: none;

  + * {
    margin-top: 0;
  }
}
`
