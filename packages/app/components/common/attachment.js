import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import styled from 'styled-components'
import { A } from '@/components/common/button'
import IconClip from '../../static/img/icon-clip.svg'

const { API } = process.env
const Container = styled.span`
> a {
  position: relative;
  overflow: hidden;
}

input {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
}

img {
  display: inline-block;
}

em {
  font-size: 11px;
}
`

export default class Attachment extends Component {
  constructor (props) {
    super(props)
    this.state = { src: '' }
  }

  handleChange ({ currentTarget }) {
    let $form = currentTarget.parentElement

    while ($form.tagName !== 'FORM') {
      $form = $form.parentElement
    }

    $form.classList.add('uploading')

    const file = currentTarget.files[0]
    const form = new window.FormData()

    this.setState({ name: 'uploading...' })

    if (file) {
      form.append('name', file.name)
      form.append('attachment', file)
      form.append('created', new Date())

      this.handleUpload(form, info => {
        if (!info.error) {
          $form.reset()
          $form.classList.remove('uploading')
          this.setState(info)
        } else {
          this.setState({ name: 'failed to upload' })
        }
      })
    }
  }

  async handleUpload (body, done) {
    return done(await (await fetch(`${API}/upload`, {
      method: 'POST',
      body
    })).json())
  }

  render () {
    return (
      <Container>
        <A href='javascript:;' icon>
          <IconClip />
          <input
            type='file'
            name='attachments'
            onChange={this.handleChange.bind(this)}
          />
        </A>

        <input type='hidden' name='image' defaultValue={this.state.id} />
        <em dangerouslySetInnerHTML={{ __html: this.state.name }} />
      </Container>
    )
  }
}
