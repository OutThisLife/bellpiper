import _ from 'lodash'
import moment from 'moment'

export const absGain = ({ principle, balance }) => {
  const result = Math.abs(principle - balance)
  const change = balance === principle ? 0 : (result / principle) * 100
  return { result, change }
}

export const percWithin = (entries, test) => {
  if (entries.length === 0) {
    return 0
  }

  const start = moment().startOf(test).utc(24).toDate()
  const end = moment().endOf(test).utc(0).toDate()

  const result = _.filter(entries, ({ change, created }) => (
      change !== 0 &&
      moment(created).isBetween(start, end)
  ))

  return parseFloat(_.meanBy(result, 'change') || 0).toFixed(2)
}

export const strikes = entries => {
  if (entries.length === 0) {
    return 0
  }

  const total = entries.length

  const gen = (obj, sort = 'desc') => {
    const rate = obj.length / total * 100
    const largest = (_.orderBy(obj, 'result', sort)[0] || { result: 0 }).result
    const mean = _.meanBy(obj, 'result')
    const sum = _.sumBy(obj, 'result')

    return [rate, largest, mean, sum]
  }

  const [
    winRate, largestWin,
    avgWin, totalWon
  ] = gen(_.filter(entries, ({ result }) => result > 0))

  const [
    lossRate, largestLoss,
    avgLoss, totalLoss
  ] = gen(_.filter(entries, ({ result }) => result < 0), 'asc')

  const avgTrade = _.meanBy(entries.map(e => Math.abs(e.result) && e), 'result')
  const rewardToRisk = avgWin / Math.abs(avgLoss)

  return {
    total,
    avgTrade,
    rewardToRisk,

    winRate,
    largestWin,
    avgWin,
    totalWon,

    lossRate,
    largestLoss,
    avgLoss,
    totalLoss
  }
}

export const zScore = entries => {
  if (entries.length === 0) {
    return 0
  }

  let w = 0
  let l = 0

  _.orderBy(entries, 'id', 'desc').map(({ result }, i) => {
    const prev = entries[i - 1]

    if (prev) {
      if (prev.result > 0 && result > 0) {
        w += 1
      } else if (prev.result < 0 && result < 0) {
        l += 1
      }
    }
  })

  w = Math.max(1, w)
  l = Math.max(1, l)

  const n = entries.length
  const r = (w + l) - 0.5
  const p = 2 * w * l

  return (n * r - p) / ((p * (p - n)) / (n - 1)) ^ 0.5
}

export const expectancy = entries => {
  if (entries.length === 0) {
    return 0
  }

  const { avgTrade, avgLoss } = strikes(entries)
  return ((avgTrade / Math.abs(avgLoss)) * 100) || 0
}

export const kelly = entries => {
  if (entries.length === 0) {
    return 0
  }

  const { avgTrade, avgWin } = strikes(entries)
  return ((avgTrade / avgWin) * 100) || 0
}

export const profitFactor = entries => {
  const { totalWon, totalLoss } = strikes(entries)
  const loss = Math.abs(totalLoss)

  if (totalWon > 0 && loss > 0) {
    return parseFloat(totalWon / loss).toFixed(2)
  }

  return 0
}

export const standardDiv = entries => {
  if (entries.length === 0) {
    return 0
  }

  const rr = _.meanBy(entries, 'change')
  const avg = 0.10
  const n = 10

  return (1 / n * (rr - avg) ^ 2) ^ 0.5
}

export const sharpe = (entries, rp) => {
  if (entries.length === 0) {
    return 0
  }

  return parseFloat(((rp / 100) - 0.05) / standardDiv(entries)).toFixed(3)
}

export const riskOfRuin = (winRate, lossRate, perc) => {
  const ratio = winRate - lossRate
  return parseFloat((((1 - ratio) / (1 + ratio)) ^ (perc / 100)) || 0).toFixed(1)
}
