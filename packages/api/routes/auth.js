import passport from 'passport'
import { Strategy as LocalStrat } from 'passport-local'
import { Strategy as TwtrStrat } from 'passport-twitter'
import { Strategy as FbStrat } from 'passport-facebook'
import { Strategy as GoogStrat } from 'passport-google-oauth20'
import { mutate } from '../data/local'
import { getCurrentUser } from '../data/resolvers'

const env = process.env
const authOptions = {
  successRedirect: env.APP_URL,
  failureRedirect: `${env.SITE_URL}/login?retry`,
  scope: ['profile']
}

const login = ({ ip }, email, password, done, key = 'password') => {
  return mutate(`
    login(input: {
      email: "${email}",
      ip: "${ip}"
      ${key}: "${password}"
    }) {
      id
    }
  `)
  .then(({ data: { login } }) => done(null, login))
  .catch(e => done(null, false))
}

// ------------------------------------------------------------

const passReqToCallback = true
const getCallback = service => `//${env.SOCIAL_CALLBACK}/auth/${service}/callback`
const handleSocial = (req, token, secret, profile, done) => {
  if (profile.id && profile.emails.length !== 0) {
    login(req, profile.emails[0].value, profile.provider, done, 'provider')
  } else {
    done(null, false)
  }
}

passport.use(new LocalStrat({ passReqToCallback }, login))

passport.use(new TwtrStrat({
  consumerKey: env.TWTR_KEY,
  consumerSecret: env.TWTR_SECRET,
  callbackURL: getCallback('twitter'),
  userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
  passReqToCallback
}, handleSocial))

passport.use(new FbStrat({
  clientID: env.FB_KEY,
  clientSecret: env.FB_SECRET,
  callbackURL: getCallback('facebook'),
  profileFields: ['id', 'emails'],
  passReqToCallback
}, handleSocial))

passport.use(new GoogStrat({
  clientID: env.GOOG_KEY,
  clientSecret: env.GOOG_SECRET,
  callbackURL: getCallback('google'),
  passReqToCallback
}, handleSocial))

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((id, done) => done(null, { id }))

// ------------------------------------------------------------

export default app => {
  app.use(passport.initialize())
  app.use(passport.session())

  app.post('/login', passport.authenticate('local', authOptions))

  ;[
    { service: 'twitter' },
    {
      service: 'facebook',
      options: { scope: ['email'] }
    },
    {
      service: 'google',
      options: { scope: ['https://www.googleapis.com/auth/userinfo.email'] }
    }
  ].map(({ service, options }) => {
    app.get(`/auth/${service}`, passport.authenticate(service, options))
    app.get(`/auth/${service}/callback`, passport.authenticate(service, Object.assign({}, options, authOptions)))
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect(env.SITE_URL)
  })

  app.get('/touch', (req, res) => {
    return getCurrentUser(req).then(() => {
      return res.status(200).end()
    }).catch(e => {
      return res.status(403).end()
    })
  })
}
