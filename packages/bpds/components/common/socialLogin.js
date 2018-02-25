import styled from 'styled-components'
import { A } from '@/components/button'

const { API } = process.env
const SocialLogin = styled(A)`
text-transform: capitalize;

&:hover {
  background: #FFF !important;
}

&.twitter {
  background: #55ACEE;

  &:hover {
    color: #55ACEE;
  }
}

&.facebook {
  background: #4267B2;

  &:hover {
    color: #4267B2;
  }
}

&.google {
  background: #DD4B39;

  &:hover {
    color: #DD4B39;
  }
}

&:not(:last-child) {
  margin-right: 10px;
}

i {
  margin-right: 10px;
}
`

export default ({ service }) => (
  <SocialLogin className={service} href={`${API}/auth/${service}`} target='_blank'>
    <i className={`fa fa-${service}`} />
    {service}
  </SocialLogin>
)
