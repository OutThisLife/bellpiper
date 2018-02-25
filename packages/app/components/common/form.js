import styled from 'styled-components'

export const Form = styled.form`
&.loading fieldset {
  pointer-events: none;

  > *:not(footer) {
    opacity: .5;
  }

  footer > *:not(button) {
    opacity: 0;
  }
}

fieldset {
  margin: 0;
  padding: 0;
  border: 0;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  + .row {
    margin-top: 5px;
  }

  + hr {
    margin-top: 0;
  }

  &.stacked {
    flex-wrap: wrap;
    margin: 20px 0;

    label {
      display: block;
      width: 100%;
      margin: 0 0 10px;
    }
  }

  &:not(.stacked) label {
    display: inline-block;
    vertical-align: middle;
    width: 80px;
  }
}

input, textarea {
  width: 100%;
}

label:not([type]) {
  color: rgb(var(--gray));
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

label[type] {
  display: block;

  input {
    margin-top: calc(var(--pad) / 3);
  }
}

[type=submit] {
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    right: 8px;
    fill: rgb(var(--secondary));
    transform: translate(0, -50%);
    transition: inherit;
  }
}

&.loading [type=submit] {
  color: rgb(var(--gray));
  padding-right: 40px;
  background: rgba(0,0,0,.1);
}

&.uploading [type=submit] {
  pointer-events: none;
}

&:not(.loading) [type=submit] svg {
  opacity: 0;
}
`

export default props => (
  <Form {...props}>
    <fieldset>{props.children}</fieldset>
  </Form>
)
