import Sequelize from 'sequelize'

const freezeTableName = true

export default db => {
  const UserModel = db.define('user', {
    email: { type: Sequelize.STRING, unique: 'compositeIndex' },
    salt: { type: Sequelize.STRING },
    digest: { type: Sequelize.STRING },
    ip: { type: Sequelize.STRING }
  }, { freezeTableName })

  const AccountModel = db.define('account', {
    principle: {
      type: Sequelize.FLOAT,
      defaultValue: 1000.00
    },
    goal: {
      type: Sequelize.FLOAT,
      defaultValue: 10.00
    },
    balance: {
      type: Sequelize.FLOAT,
      defaultValue: 1000.00
    },
    history: { type: Sequelize.STRING },
    bracket: {
      type: Sequelize.INTEGER,
      defaultValue: 1100
    },
    lastBracket: {
      type: Sequelize.INTEGER,
      defaultValue: 1000
    }
  }, { freezeTableName })

  const EntryModel = db.define('entries', {
    entryId: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    title: { type: Sequelize.STRING },
    desc: { type: Sequelize.STRING },
    tags: { type: Sequelize.STRING },
    mood: { type: Sequelize.STRING },
    result: {
      type: Sequelize.FLOAT,
      defaultValue: 0.0
    },
    change: { type: Sequelize.FLOAT }
  }, { freezeTableName })

  const ImgModel = db.define('images', {
    buffer: { type: Sequelize.BLOB('long') },
    name: { type: Sequelize.STRING },
    mimetype: { type: Sequelize.STRING },
    size: { type: Sequelize.INTEGER }
  }, { freezeTableName })

  UserModel.hasOne(AccountModel)
  AccountModel.belongsTo(UserModel)
  AccountModel.hasMany(EntryModel)
  EntryModel.belongsTo(AccountModel)
  EntryModel.hasOne(ImgModel)

  return { UserModel, AccountModel, EntryModel, ImgModel }
}
