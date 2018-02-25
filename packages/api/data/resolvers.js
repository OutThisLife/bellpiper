import { User, Entries, Image } from './connectors'

export const getCurrentUser = ({ headers: { authorization }, sessionStore }) => {
  let id = 1

  if (authorization) {
    const sid = decodeURIComponent(authorization).match(/s:(.*)\./)[1]
    const sess = sessionStore.sessions[sid]

    if (sess) {
      const { passport: { user } } = JSON.parse(sess)
      id = user.id
    }
  }

  return User.findById(id).then(user => user.getAccount().then(account => {
    return { ...user.dataValues, account }
  })).catch(e => {
    throw e
  })
}

export default {
  Query: {
    user: (_, where, ctx) => getCurrentUser(ctx),
    entry: (obj, { id }) => Entries.findById(id),
    image: (_, { id }) => Image.findById(id)
  },

  Buffer: {
    __serialize: value => value
  },

  User: {
    account: obj => obj.account,
    entries: ({ account }, args) => {
      if (!args.orderBy) {
        args.orderBy = {
          field: 'id',
          direction: 'asc'
        }
      }

      return Entries.findAll({
        limit: args.limit.split(', ').map(Number),
        order: [[args.orderBy.field, (args.orderBy.direction).toUpperCase()]],
        where: {
          entryId: args.entryId,
          accountId: account.id
        }
      })
    }
  },

  Entries: {
    image: obj => obj.getImage()
  },

  Mutation: {
    login: (_, { input: { email, ip, password, provider } }) => {
      return User.findOrCreate({
        where: { email: email },
        defaults: {
          ip: ip,
          digest: password || [...Array(16)].map(() => Math.random().toString(36)[3]).join('')
        }
      }).then(user => {
        const handleSuccess = () => {
          const { id, ip, email } = user[0].dataValues
          return { id, ip, email }
        }

        if (provider) {
          return handleSuccess()
        }

        return user[0].validatePassword(password).then(res => {
          if (res) {
            return handleSuccess()
          } else {
            throw new Error('Invalid login')
          }
        })
      })
    },

    updateAccount: (_, { input }, ctx) => {
      return getCurrentUser(ctx).then(user => {
        return user.account.update(input).then(() => user)
      })
    },

    addEntry: (_, { input }, ctx) => {
      return getCurrentUser(ctx).then(({ account }) => {
        return account.createEntry(input).then(entry => {
          if (input.image.id !== 0) {
            return Image.findById(input.image.id).then(img => {
              img.update({ entryId: entry.id })
              return Entries.findById(entry.id)
            })
          }

          return entry
        })
      })
    },

    closeEntry: (_, { id, input: { result } }, ctx) => {
      return getCurrentUser(ctx).then(({ account }) => {
        const balance = parseInt(account.dataValues.balance)
        const newBalance = balance + result
        const change = parseFloat((result / balance) * 100)

        account.update({ balance: newBalance })

        return Entries.findById(id).then(entry => {
          entry.update({ result, change })
          return entry
        })
      })
    },

    deleteEntry: (_, { id }) => Entries.destroy({ where: { id } })
  }
}
