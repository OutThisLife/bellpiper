import styled from 'styled-components'

const Option = styled.label`
cursor: pointer;
opacity: 1;
display: block;
position: relative;
width: auto;

+ label[type] {
  margin-top: 15px !important;
}

input {
  visibility: hidden;
  position: absolute;
  width: auto;
  margin: 0;
  padding: 0;

  &:checked + span {
    box-shadow: inset 0 0 0 2px rgb(var(--bg)), inset 0 0 0 7px rgb(var(--brand));
  }
}

> span {
  display: inline-block;
  vertical-align: middle;
  width: 13px;
  height: 13px;
  margin: 0 13px 0 0;
  padding: 1px;
  border: 1px solid #d1d5da;
  border-radius: ${({ type }) => !type || type === 'radio' ? '100em' : 'initial'};
  background: var(rgb(--bg));
}

em {
  font-style: normal;
  position: relative;

  span {
    z-index: 1;
    position: inherit;
  }
}

input:checked ~ em:after {
  content: '';
  z-index: 0;
  pointer-events: none;
  position: absolute;
  top: -3px;
  right: -7px;
  bottom: -3px;
  left: -7px;
  border-radius: 2rem;
  transform: rotateX(30deg) rotateZ(1deg) translate(0, 2px);
  background: rgb(var(--highlight));
}
`

export default props => {
  const { label, type, checked, name, value, ...extras } = props

  return (
    <Option type={type}>
      <input
        {...extras}
        type={type || 'radio'}
        name={name}
        value={value || 1}
        defaultChecked={checked || false}
      />

      <span />
      <em><span>{label}</span></em>
    </Option>
  )
}
