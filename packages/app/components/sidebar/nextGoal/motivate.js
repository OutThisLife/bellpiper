const quotes = {
  '0.8': ['lets do this!', 'gotta start somewhere'],
  '0.6': ['you are doing great'],
  '0.49': ['over halfway there! you can do it'],
  '0.3': ['amazing progress'],
  '0.1': ['its in the bag']
}

export default p => {
  let quote = 'the world is yours'

  Object.keys(quotes).some(i => {
    const batch = quotes[i]

    if (parseFloat(i) <= p) {
      quote = batch[Math.floor(Math.random() * batch.length)]
      return 1
    }
  })

  return quote
}
