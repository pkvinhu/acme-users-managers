const Sequelize = require('Sequelize')
const db = new Sequelize(process.env.DATABASE_URL, { logging: false })

const User = db.define('user', {
  name: {
  	type: Sequelize.STRING,
  	allowNull: false
  },
  img: {
  	type: Sequelize.STRING,
  	validate: {
  	  isUrl: true
  	}
  },
  bio: Sequelize.TEXT
})

User.hasMany(User, {as: 'employees'})
User.belongsTo(User, {as: 'manager'})

module.exports = {
  db,
  User
}