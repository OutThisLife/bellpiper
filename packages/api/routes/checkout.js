import braintree from 'braintree'

const { BRAINTREE_ID, BRAINTREE_KEY, BRAINTREE_SECRET } = process.env

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: BRAINTREE_ID,
  publicKey: BRAINTREE_KEY,
  privateKey: BRAINTREE_SECRET
})

export default app => {
  app.get('/checkout/new', (req, res) => {
    gateway.clientToken.generate({}, (req, ({ clientToken }) => res.send(clientToken)))
  })

  app.post('/checkout', ({ body }, res) => {
    const { nonce, amount } = body

    return gateway.transaction.sale({
      amount,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true
      }
    }).then(result => {
      if (result.success) {
        //
      }
    }).catch(e => {
      throw e
    })
  })
}
