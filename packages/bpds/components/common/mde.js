import { PureComponent } from 'react'
import styled from 'styled-components'

const Textarea = styled.textarea`
+ .editor-toolbar {
  padding: 5px 0 5px calc(var(--pad) / 2 - 5px);
  border: 0;

  &:before, &:after {
    display: none;
  }

  a.fa {
    color: rgba(var(--default), .7) !important;
    width: auto;
    height: auto;
    padding: 5px;

    &:hover {
      border-color: rgb(var(--gray));
      background: rgb(var(--header-bg));
    }

    + a.fa {
      margin-left: 5px;
    }

    &:before {
      font-size: 12px;
      line-height: 1;
    }
  }

  i.separator {
    border-color: rgb(var(--gray));
  }
}

~ .CodeMirror {
  color: rgb(var(--default));
  min-height: 150px;
  max-height: 300px;
  border: 0;
  background: rgb(var(--bg));

  .CodeMirror-scroll {
    min-height: inherit;
    max-height: inherit;
  }
}
`

export default class MDE extends PureComponent {
  componentDidMount () {
    if (this.el) {
      const SimpleMDE = require('simplemde')

      this.mde = new SimpleMDE({
        ...this.props,
        element: this.el,
        indentWithTabs: false,
        status: false,
        hideIcons: ['guide', 'image', 'side-by-side', 'fullscreen', 'preview']
      })
    }
  }

  componentWillUnmount () {
    if (this.mde) {
      this.mde.toTextArea()
      this.mde = null
    }
  }

  render () {
    return <Textarea innerRef={c => (this.el = c)} />
  }
}
