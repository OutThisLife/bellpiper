import express from 'express'
import cors from 'cors'
import compression from 'compression'
import parser from 'body-parser'
import session from 'express-session'
import { middleware as cache } from 'apicache'

require('dotenv').config()

const { PORT, SESS_SECRET } = process.env
const port = PORT || 3137
const app = express()

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || /(bellpiper|localhost|chrome)/.test(origin)) {
      cb(null, true)
    } else {
      cb(JSON.stringify({ error: 'Origin not allowed' }))
    }
  }
}))

app.set('trust proxy', true)
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.use(compression())
app.use(session({
  secret: SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    sameSite: false,
    secure: false
  }
}))

require('./routes/auth').default(app)
require('./routes/images').default(app)
require('./routes/graph').default(app)

app.get('*', cache('1 year'), (req, res) => res.end('<3'))
app.listen(port, () => console.log(`Listening on port ${port}`))
