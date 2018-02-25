import Sequelize from 'sequelize'
import dataloader from 'dataloader-sequelize'
import bcrypt from 'bcrypt'
import models from './models'

require('dotenv').load()

const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env
const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

dataloader(db)

// ------------------------------------------------------------

const { UserModel, AccountModel } = models(db)

UserModel.prototype.validatePassword = function (password) {
  return bcrypt.compare(password, this.digest)
}

UserModel.beforeCreate((user, options) => {
  return bcrypt.genSalt(16).then(salt => {
    user.salt = salt
    return bcrypt.hash(user.digest, salt, null)
  }).then(hash => {
    user.digest = hash
  }).catch(e => {
    db.Promise.reject(e)
  })
})

UserModel.afterCreate(({ id }) => AccountModel.create({ userId: id }))

// ------------------------------------------------------------

export const User = db.models.user
export const Account = db.models.account
export const Entries = db.models.entries
export const Image = db.models.images
