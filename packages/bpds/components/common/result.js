import styled from 'styled-components'

const Result = styled.strong`
b {
  opacity: .7;
  font-size: 84%;
}
`

export default ({ result, change }) => {
  const isWin = parseFloat(change) > 0
  const perc = `${parseFloat(change).toFixed(1)}%`
  const __html = !result ? perc : `${isWin ? `+${result}` : result} <b>(${perc})</b>`

  return (
    <Result
      className={isWin ? 'green' : change < 0 ? 'red' : 'gray'}
      dangerouslySetInnerHTML={{ __html }}
    />
  )
}
