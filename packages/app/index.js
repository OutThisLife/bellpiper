import next from 'next'
import express from 'express'
import compression from 'compression'
import parser from 'body-parser'
import cookies from 'cookie-parser'
import session from 'express-session'
import routes from './routes'

require('dotenv').config()

const { PORT, NODE_ENV, SESS_SECRET } = process.env
const port = PORT || 3055
const dev = NODE_ENV !== 'production'

const app = next({ dev })
const handle = routes.getRequestHandler(app)

app.prepare().then(() => {
  const x = express()

  x.use(parser.urlencoded({ extended: false }))
  x.use(parser.json())
  x.use(compression())
  x.use(cookies())
  x.use(session({
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      sameSite: false,
      secure: false
    }
  }))

  x.use(handle).listen(port, () => console.log(`Listening on port ${port}`))
})
