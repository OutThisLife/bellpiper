export const getGradient = (start, end, h) => {
  let ctx = document.createElement('canvas').getContext('2d')
  const gradient = ctx.createLinearGradient(0, h || 400, 0, 0)

  gradient.addColorStop(0, start)
  gradient.addColorStop(1, end)

  ctx = null

  return gradient
}

export const randomRGB = () => {
  const num = Math.round(0xffffff * Math.random())
  const r = num >> 16
  const g = num >> 8 & 255
  const b = num & 255

  return `${r}, ${g}, ${b}`
}

export const randomHex = () => {
  return `#${parseInt(Math.random() * 0xffffff, 10).toString(16)}`
}

export const between = (min, max) => {
  return Math.round(Math.random() * max) + min
}
